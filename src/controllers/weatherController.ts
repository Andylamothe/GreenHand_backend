import { exec } from "child_process";
import path from "path";
import { Request, Response } from "express";

export const getWeatherStats = (req: Request, res: Response) => {
  const scriptPath = path.resolve(process.cwd(), "src/data/meteo.py");
  const pythonCmd = process.env.NODE_ENV === 'production' ? 'python3' : 'python';

  console.log(`Executing: ${pythonCmd} "${scriptPath}"`);

  exec(`${pythonCmd} "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("Python error:", error.message);
      console.error("Error code:", error.code);
      console.error("stderr:", stderr);
      return res.status(500).json({ 
        error: "Python execution failed",
        details: error.message,
        stderr: stderr 
      });
    }

    if (stderr) {
      console.error("Python stderr:", stderr);
    }

    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (e) {
      console.error("Invalid JSON from Python:", stdout);
      res.status(500).json({ error: "Invalid JSON output" });
    }
  });
};

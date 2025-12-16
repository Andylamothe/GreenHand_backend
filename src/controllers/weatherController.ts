import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";

export const getWeatherStats = (req: Request, res: Response) => {
  const pythonCmd = process.env.NODE_ENV === 'production' ? 'python3' : 'python';

  // Resolve script path: prioritize dist/data, fallback to src/data
  let scriptPath: string;
  const distPath = path.join(__dirname, "../data/meteo.py");
  const srcPath = path.resolve(process.cwd(), "src/data/meteo.py");
  
  if (fs.existsSync(distPath)) {
    scriptPath = distPath;
  } else if (fs.existsSync(srcPath)) {
    scriptPath = srcPath;
  } else {
    scriptPath = distPath; // Default fallback
  }

  console.log(`Executing: ${pythonCmd} "${scriptPath}"`);
  console.log(`Script exists: ${fs.existsSync(scriptPath)}`);
  console.log(`__dirname: ${__dirname}`);
  console.log(`process.cwd(): ${process.cwd()}`);

  const envVars = { ...process.env, PYTHONPATH: process.env.PYTHONPATH || '' };
  exec(`${pythonCmd} "${scriptPath}"`, { env: envVars }, (error, stdout, stderr) => {
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

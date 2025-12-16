import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";

export const getWeatherStats = (req: Request, res: Response) => {
  const pythonCmd = process.env.NODE_ENV === 'production' ? 'python3' : 'python';

  // On Render: dist/data/meteo.py
  // On dev: src/data/meteo.py
  const distScriptPath = path.join(__dirname, "../data/meteo.py");
  const srcScriptPath = path.resolve(process.cwd(), "src/data/meteo.py");
  
  const scriptPath = fs.existsSync(distScriptPath) ? distScriptPath : srcScriptPath;
  const distExists = fs.existsSync(distScriptPath);
  const srcExists = fs.existsSync(srcScriptPath);

  console.log(`[Weather] dist path exists: ${distExists} => ${distScriptPath}`);
  console.log(`[Weather] src path exists: ${srcExists} => ${srcScriptPath}`);
  console.log(`[Weather] Using: ${scriptPath}`);
  console.log(`[Weather] Command: ${pythonCmd} "${scriptPath}"`);

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

import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export const getPlantStats = (req: Request, res: Response) => {
  const pythonCmd = process.env.NODE_ENV === 'production' ? 'python3' : 'python';

  // On Render: dist/data/plante.py
  // On dev: src/data/plante.py
  const distScriptPath = path.join(__dirname, "../data/plante.py");
  const srcScriptPath = path.resolve(process.cwd(), "src/data/plante.py");
  
  const scriptPath = fs.existsSync(distScriptPath) ? distScriptPath : srcScriptPath;
  const distExists = fs.existsSync(distScriptPath);
  const srcExists = fs.existsSync(srcScriptPath);

  console.log(`[PlantDash] dist path exists: ${distExists} => ${distScriptPath}`);
  console.log(`[PlantDash] src path exists: ${srcExists} => ${srcScriptPath}`);
  console.log(`[PlantDash] Using: ${scriptPath}`);
  console.log(`[PlantDash] Command: ${pythonCmd} "${scriptPath}"`);
  
  //le maxBuffer cets pour definir la taillee maximale pour node qui peut stocker pour la sortie standrat et la sortie derreubr
  const envVars = { ...process.env, PYTHONPATH: process.env.PYTHONPATH || '' };
  exec(`${pythonCmd} "${scriptPath}"`, { maxBuffer: 1024 * 1024 * 10, env: envVars }, (error, stdout, stderr) => {
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
      //Si plante.py imprime du JSON valide
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (e) {
      console.error("Invalid JSON from Python:", stdout);
      res.status(500).json({ error: "Invalid JSON output from Python" });
    }
  });
};

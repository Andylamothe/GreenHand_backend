import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";

export const getPlantStats = (req: Request, res: Response) => {
  const scriptPath = path.resolve(process.cwd(), "src/data/plante.py");

  //le maxBuffer cets pour definir la taillee maximale pour node qui peut stocker pour la sortie standrat et la sortie derreubr
  exec(`python "${scriptPath}"`, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
    if (error) {
      console.error("Python error:", error);
      return res.status(500).json({ error: "Python execution failed" });
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

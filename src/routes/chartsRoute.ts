import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/", (req, res) => {
  const chartsDir = path.join(process.cwd(), "public");

  fs.readdir(chartsDir, (err, files) => {
    if (err) {
      console.error("Erreur lecture charts:", err);
      return res
        .status(500)
        .json({ error: "Impossible de lire le dossier charts" });
    }

    const pngFiles = files.filter((f) => f.endsWith(".png"));
    const baseUrl = `${req.protocol}://${req.headers.host}`;
    const urls = pngFiles.map((f) => `${baseUrl}/charts/${f}`);

    res.json({ files: urls });
  });
});

export default router;

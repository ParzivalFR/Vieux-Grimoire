const multer = require("multer");
const sharp = require("sharp");

// Modules natifs Node.js pour gérer les fichiers et les chemins de fichiers
const path = require("path");
const fs = require("fs");

// Configuration
const storage = multer.diskStorage({
  // Enregistrement des fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  filename: (req, file, callback) => {
    const name = file.originalname.slice(0, 3);
    callback(null, name + Date.now() + ".webp");
  },

  // Vérification du type MIME du fichier
  fileFilter: (req, file, callback) => {
    !file.originalname.match(/\.(jpg|jpeg|png|webp)$/)
      ? callback(
          new Error("Seuls les fichiers JPG, JPEG et PNG sont autorisés !"),
          false
        )
      : callback(null, true);
  },
});

// Création du dossier images s'il n'existe pas
if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}

module.exports = multer({ storage: storage }).single("image");

module.exports.optimizeImage = (req, res, next) => {
  // On vérifie si un fichier a été téléchargé
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const fileName = req.file.filename;
  const outputFilePath = path.join("images", `resized_${fileName}`);

  // Désactivation du cache !!!
  sharp.cache(false);
  sharp(filePath)
    .resize({ height: 600 })
    .toFile(outputFilePath)
    .then(() => {
      console.log(`Image ${fileName} optimisée avec succès !`);
      // Remplacer le fichier original par le fichier optimisé
      fs.unlink(filePath, () => {
        req.file.path = outputFilePath;
        console.log(`Image ${fileName} supprimée avec succès !`);
        next();
      });
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};

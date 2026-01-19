const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

async function processImage(file) {
    const outputDir = path.join(
        __dirname,
        "../",
        "../",
        "public",
        "img",
        "products",
    );
    fs.mkdirSync(outputDir, { recursive: true });

    const fileName = crypto.randomUUID() + ".webp";
    const outputPath = path.join(outputDir, fileName);

    if (file.mimetype === "image/webp") {
        fs.renameSync(file.path, outputPath);
        return fileName;
    }

    const image = sharp(file.path);
    await image.resize({
        width: 250,
        height: 300,
        fit: "inside",
        withoutEnlargement: true,
    })
        .webp({ quality: 80 })
        .toFile(outputPath);

    fs.unlinkSync(file.path);
    return fileName;
}

module.exports = { processImage };

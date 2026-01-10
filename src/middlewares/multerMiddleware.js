const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../", "../public", "img", "products"));
    },
    filename: function (req, file, cb) {
        req.body.filepath = file.originalname;
        cb(null, file.originalname);
    },
});

const uploadImg = multer({ storage: storage });

module.exports = { uploadImg };

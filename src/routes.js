const { Router } = require("express");
const { authAdmin, createNewAdmin, createProduct } = require("./controllers/admin-controller");
const { loginAuthMiddleware, adminAuthMiddleware } = require("./middlewares/authMiddleware");
const { loginPage, adminPage, createProductPage } = require("./controllers/admin-render-controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public", "img"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const uploadImg = multer({ storage: storage });

const router = Router();

router.post("/create", createNewAdmin); // Rota manual. Incompleta.
// Rotas do administrador
router.get("/login", loginAuthMiddleware, loginPage);
router.post("/authAdmin", authAdmin);
router.get("/admin", adminAuthMiddleware, adminPage);
router.get("/admin/create", createProductPage);
router.post("/admin/create/new", uploadImg.single("image"), createProduct);

module.exports = router;
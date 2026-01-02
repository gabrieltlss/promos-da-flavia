const { Router } = require("express");
const { authAdmin, createNewAdmin } = require("./controllers/admin-controller");
const { loginAuthMiddleware, adminAuthMiddleware } = require("./middlewares/authMiddleware");
const { loginPage, adminPage } = require("./controllers/admin-render-controller");
const { createProductPage, createNewProduct, updateProductsPage } = require("./controllers/admin-product-controller");
const { createCategoryPage, createNewCategory, deleteCategoryPage, deleteInformedCategory, updateCategoryPage, updateInformedCategory } = require("./controllers/admin-category-controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public", "img"))
    },
    filename: function (req, file, cb) {
        req.body.filepath = file.originalname;
        cb(null, file.originalname)
    }
});
const uploadImg = multer({ storage: storage });

const router = Router();

// Rotas do administrador
router.get("/login", loginAuthMiddleware, loginPage);
router.post("/authAdmin", authAdmin);
router.get("/admin", adminAuthMiddleware, adminPage);

// Produto
router.get("/admin/product/create", createProductPage);
router.post("/admin/product/create/new", uploadImg.single("image-input"), createNewProduct);
router.get("/admin/product/update", updateProductsPage);

// Categoria
router.get("/admin/category/create", createCategoryPage);
router.post("/admin/category/create/new", createNewCategory);
router.get("/admin/category/delete", deleteCategoryPage);
router.post("/admin/category/delete/post", deleteInformedCategory);
router.get("/admin/category/update", updateCategoryPage);
router.post("/admin/category/update/post", updateInformedCategory);

// Rota manual. Incompleta.
router.post("/create", createNewAdmin);

// Error
// router.get("/error", (req, res) => res.render("error"));

module.exports = router;
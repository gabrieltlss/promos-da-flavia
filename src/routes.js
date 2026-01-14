const { Router } = require("express");
const { loginPage, adminPage, authAdmin, createNewAdmin, adminLogout } =
    require(
        "./controllers/admin-controller",
    );

const { loginAuthMiddleware, adminAuthMiddleware } = require(
    "./middlewares/authMiddleware",
);

const {
    createProductPage,
    createNewProduct,
    updateProductPage,
    updateProductController,
    deleteProductPage,
    deleteProductController,
} = require("./controllers/admin-product-controller");

const {
    createCategoryPage,
    createNewCategory,
    deleteCategoryPage,
    deleteInformedCategory,
    updateCategoryPage,
    updateInformedCategory,
} = require("./controllers/admin-category-controller");

const router = Router();

const { uploadImg } = require("./middlewares/multerMiddleware");

// Rota para manter node ativo.
router.get("/health", (req, res) => {
    console.log(`Health route - ${new Date()}`);
    res.status(200).send("OK");
});

// Rotas do administrador
router.get("/login", loginAuthMiddleware, loginPage);
router.post("/authAdmin", authAdmin);
router.get("/admin", adminAuthMiddleware, adminPage);
router.get("/admin/logout", adminLogout);

// Produto
router.get("/admin/product/create", adminAuthMiddleware, createProductPage);
router.post(
    "/admin/product/create/new",
    uploadImg.single("image-input"),
    createNewProduct,
);
router.get("/admin/product/update", adminAuthMiddleware, updateProductPage);
router.post(
    "/admin/product/update/post",
    uploadImg.single("image-input"),
    updateProductController,
);
router.get("/admin/product/delete", adminAuthMiddleware, deleteProductPage);
router.post("/admin/product/delete/post", deleteProductController);

// Categoria
router.get("/admin/category/create", adminAuthMiddleware, createCategoryPage);
router.post("/admin/category/create/new", createNewCategory);
router.get("/admin/category/delete", adminAuthMiddleware, deleteCategoryPage);
router.post("/admin/category/delete/post", deleteInformedCategory);
router.get("/admin/category/update", adminAuthMiddleware, updateCategoryPage);
router.post("/admin/category/update/post", updateInformedCategory);

// Rota manual. Incompleta.
router.post("/create", createNewAdmin);

module.exports = router;

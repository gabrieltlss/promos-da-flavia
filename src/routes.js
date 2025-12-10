const { Router } = require("express");
const { authAdmin, create } = require("./controllers/admin-controller");
const { loginAuthMiddleware, adminAuthMiddleware } = require("./middlewares/authMiddleware");
const { loginPage, adminPage, createProductPage } = require("./controllers/admin-render-controller");

const router = Router();

router.post("/create", create); // Rota manual. Incompleta.

// Rotas do administrador
router.get("/login", loginAuthMiddleware, loginPage);
router.post("/authAdmin", authAdmin);
router.get("/admin", adminAuthMiddleware, adminPage);
router.get("/admin/create", createProductPage);

module.exports = router;
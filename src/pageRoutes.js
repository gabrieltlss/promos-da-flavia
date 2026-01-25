const { Router } = require("express");
const { indexPage } = require("./controllers/page-controller");

const pageRouter = Router();

pageRouter.get("/", indexPage);

module.exports = { pageRouter };

const { indexProducts, indexCategories, categoryProducts } = require("../services/indexServices");

async function indexPage(req, res) {
    try {
        const getProdcuts = await indexProducts();
        const getCategories = await indexCategories();

        if (getProdcuts.valid === false && getCategories.valid === false) {
            res.render("index");
            return;
        }
        if (getProdcuts.valid === true && getCategories.valid === true) {
            res.render("index", {
                dailyOffers: getProdcuts.res,
                categories: getCategories.res,
            });
            return;
        }
        // Se ambos não são falsos e nem verdadeiros, um só é verdadeiro (Abaixo)
        if (getProdcuts.valid === true) {
            res.render("index", {
                dailyOffers: getProdcuts.res,
            });
            return;
        }
        if (getCategories.valid === true) {
            res.render("index", {
                categories: getCategories.res,
            });
            return;
        }
    } catch (error) {
        console.log("Index page", error.message);
        res.render("index");
    }
}

async function categoryPage(req, res) {
    try {
        const getCategories = await indexCategories();
        const getProducts = await categoryProducts();
        if (getProducts.valid === false || getCategories.valid === false) {
            res.render("category");
            return;
        }
        res.render("category", { categories: getCategories.res, products: getProducts.res });
    } catch (error) {
        console.log("Category page", error.message);
        res.render("category");
    }
}

module.exports = { indexPage, categoryPage };

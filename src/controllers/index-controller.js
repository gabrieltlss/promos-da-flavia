const { indexProducts, indexCategories } = require("../services/indexServices");

// === Renderização ===
async function indexPage(req, res) {
    let getProdcuts = null;
    let getCategories = null;

    try {
        getProdcuts = await indexProducts();
        getCategories = await indexCategories();

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

module.exports = { indexPage };

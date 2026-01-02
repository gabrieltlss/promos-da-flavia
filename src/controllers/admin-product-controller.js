const { createProduct, getAllProducts } = require("../services/productServices");
const { getAllCategories } = require("../services/categoryServices")
const { validateProductFields } = require("../services/validationServices");

//  === Renderização ===
async function createProductPage(req, res) {
    try {
        const getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("create-product", { message: "Crie categorias antes de criar um produto" });
            return;
        }
        res.render("create-product", { categoriesExists: getCategories.valid, categories: getCategories.res });
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}
// Falta-me terminar o tratamento de erro da página acima.

async function updateProductsPage(req, res) {
    let getProducts = null;
    let getCategories = null;

    try {
        getProducts = await getAllProducts();
        if (getProducts.valid === false) {
            res.render("update-product", { message: "Crie produtos para poder atualizá-los." });
            return;
        }

        getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("update-product", { productsExists: getProducts.valid, products: getProducts.res });
            return;
        }

        const productAndCategories = getProducts.res.map((prod) => {
            let categoryName = null;
            for (let i = 0; i < getCategories.res.length; i++) {
                if (getCategories.res[i].id === prod["category_id"]) {
                    categoryName = getCategories.res[i].name;
                    break;
                }
            }
            return { ...prod, categoryName };
        });

        console.log(productAndCategories);

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}


// === Lógica ===
async function createNewProduct(req, res) {
    const productName = req.body.name;
    const productPrice = Number(req.body.price);
    const productUrl = req.body.url;
    const imgPath = req.body.filepath;
    const productCategory = Number(req.body.category);

    const fields = validateProductFields(productName, productPrice);
    if (fields.valid === false) {
        res.render("create", { errorMessage: fields.error });
        return;
    }

    try {
        const newProduct = await createProduct(productName, productPrice, productUrl, imgPath, productCategory);
        console.log(newProduct);
        if (newProduct.valid === false) {
            res.render("create", { errorMessage: newProduct.error });
            return;
        }
        res.json("Produto criado.");
    } catch (error) {
        // Devo mudar no futuro - Não mostrar mensagem de erro do BD.
        console.log(error.message)
        res.render("create", { errorMessage: error.message });
    }

}

module.exports = { createProductPage, createNewProduct, updateProductsPage };
const fs = require("node:fs");
const path = require("node:path");
const {
    createProduct,
    getAllProducts,
    updateProduct,
    joinTables,
    deleteProduct,
} = require("../services/productServices");
const { getAllCategories } = require("../services/categoryServices");
const { validateProductFields } = require("../services/validationServices");
const { processImage } = require("../services/imageServices");

//  === Renderização ===
async function createProductPage(req, res) {
    try {
        const getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("create-product");
            return;
        }
        res.render("create-product", {
            categoriesExists: getCategories.valid,
            categories: getCategories.res,
        });
    } catch (error) {
        console.log(error.message);
        res.render("create-product", {
            loadingError: "Erro ao renderizar página e seus dados.",
        });
    }
}

async function updateProductPage(req, res) {
    let getProducts = null;
    let getCategories = null;

    try {
        getProducts = await getAllProducts();
        if (getProducts.valid === false) {
            res.render("update-product", {
                message: "Crie produtos para poder atualizá-los.",
            });
            return;
        }

        getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("update-product", {
                productsExists: getProducts.valid,
                products: getProducts.res,
            });
            return;
        }

        const productAndCategories = joinTables(
            getProducts.res,
            getCategories.res,
        );

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res,
        });
    } catch (error) {
        console.log(error.message);
        res.render("update-product", {
            loadingError: "Erro ao renderizar página e seus dados.",
        });
    }
}

async function deleteProductPage(req, res) {
    let getProducts = null;
    try {
        getProducts = await getAllProducts();
        if (getProducts.valid === false) {
            res.render("delete-product", {
                message: "Crie produtos para poder exclui-los.",
            });
            return;
        }

        res.render("delete-product", {
            productsExists: getProducts.valid,
            products: getProducts.res,
        });
    } catch (error) {
        console.log(error.message);
        res.render("delete-product", {
            loadingError: "Erro ao renderizar página e seus dados.",
        });
    }
}

// === Lógica ===
async function createNewProduct(req, res) {
    const productName = req.body.name;
    const productPrice = Number(req.body.price);
    const productUrl = req.body.url;
    const category = req.body.category;
    const productCategory = category === "null" ? null : Number(category);
    let productImg = null;

    const fields = validateProductFields(productName, productPrice);
    if (fields.valid === false) {
        res.render("create-product", { errorMessage: fields.error });
        return;
    }

    try {
        if (req.file) {
            // Tratar erro aqui? Não há imagem...
            productImg = await processImage(req.file);
        }

        const newProduct = await createProduct(
            productName,
            productPrice,
            productUrl,
            productImg,
            productCategory,
        );

        if (newProduct.valid === false) {
            res.render("create-product", { errorMessage: newProduct.error });
            return;
        }
        res.redirect("/admin/product/create");
    } catch (error) {
        console.log(error);
        res.render("create-product", {
            loadingError: "Erro ao renderizar página e seus dados.",
        });
    }
}

async function updateProductController(req, res) {
    const productId = Number(req.body["product-id"]);
    const productName = req.body["product-name"];
    const productPrice = Number(req.body["product-price"]);
    const productUrl = req.body["product-url"];
    let productImg = null;
    const category = req.body["product-category"];
    const productCategory = category === "null" ? null : Number(category);

    let getProducts = null;
    let getCategories = null;

    try {
        getProducts = await getAllProducts();
        if (getProducts.valid === false) {
            res.render("update-product", {
                message: "Crie produtos para poder atualizá-los.",
            });
            return;
        }

        getCategories = await getAllCategories();
    } catch (error) {
        console.log(error.message);
        res.render("update-product", {
            loadingError: "Erro ao renderizar página e seus dados.",
        });
    }

    const productExists = getProducts.res.find((prod) =>
        Number(prod.id) === productId
    );
    if (!productExists) {
        if (getCategories.valid === false) {
            res.render("update-product", {
                productsExists: getProducts.valid,
                products: getProducts.res,
                errorMessage: "O produto informado não existe.",
            });
            return;
        }

        const productAndCategories = joinTables(
            getProducts.res,
            getCategories.res,
        );

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res,
            errorMessage: "O produto informado não existe.",
        });
        return;
    }

    let updatedProduct = null;
    try {
        if (req.file) {
            productImg = await processImage(req.file);

            // Excluindo antiga imagem
            const imgPath = path.join(
                __dirname,
                "../",
                "../",
                "public",
                "img",
                "products",
                productExists.img,
            );
            fs.unlinkSync(imgPath);
        } else {
            productImg = productExists.img;
        }

        const updateObj = {
            name: productName,
            price: productPrice,
            url: productUrl,
            img: productImg,
            categoryId: productCategory,
            productId: productId,
        };

        updatedProduct = await updateProduct(updateObj);
    } catch (error) {
        if (getCategories.valid === false) {
            res.render("update-product", {
                productsExists: getProducts.valid,
                products: getProducts.res,
                errorMessage: "Erro ao atualizar produto.",
            });
            return;
        }

        const productAndCategories = joinTables(
            getProducts.res,
            getCategories.res,
        );

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res,
            errorMessage: "Erro ao atualizar produto.",
        });
    }

    if (updatedProduct.valid === false) {
        if (getCategories.valid === false) {
            res.render("update-product", {
                productsExists: getProducts.valid,
                products: getProducts.res,
                errorMessage: updatedProduct.error,
            });
            return;
        }

        const productAndCategories = joinTables(
            getProducts.res,
            getCategories.res,
        );

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res,
            errorMessage: updatedProduct.error,
        });
        return;
    }
    res.redirect("/admin/product/update");
    return;
}

async function deleteProductController(req, res) {
    const productId = Number(req.body["product-id"]);

    let getProducts = null;
    try {
        getProducts = await getAllProducts();
        if (getProducts.valid === false) {
            res.render("delete-product", {
                message: "Crie produtos para poder exclui-los.",
            });
            return;
        }
    } catch (error) {
        console.log(error.message);
        res.render("delete-product", {
            loadingError: "Erro ao renderizar página e seus dados.",
        });
    }

    const productExists = getProducts.res.find((prod) =>
        Number(prod.id) === productId
    );
    if (!productExists) {
        res.render("delete-product", {
            productsExists: getProducts.valid,
            products: getProducts.res,
            errorMessage: "O produto informado não existe.",
        });
        return;
    }

    try {
        const deletedProduct = await deleteProduct(productId);
        if (deletedProduct.valid === false) {
            res.render("delete-product", {
                productsExists: getProducts.valid,
                products: getProducts.res,
                errorMessage: deletedProduct.error,
            });
            return;
        }

        // Excluir imagem do produto excluído.
        const imgPath = path.join(
            __dirname,
            "../",
            "../",
            "public",
            "img",
            "products",
            productExists.img,
        );

        fs.unlinkSync(imgPath);

        res.redirect("/admin/product/delete/");
    } catch (error) {
        console.log(error.message);
        res.render("delete-product", {
            loadingError: "Erro ao renderizar página e seus dados.",
        });
    }
}

module.exports = {
    createProductPage,
    createNewProduct,
    updateProductPage,
    updateProductController,
    deleteProductPage,
    deleteProductController,
};

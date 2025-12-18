const { getProductsDb, createProductDb } = require("../repository/productRepository.js");
const { generateProductId } = require("./validationServices.js");

async function createProduct(name, price, url, imgPath) {
    const prodId = generateProductId();
    const [product] = await createProductDb(prodId, name, price, url, imgPath);
    if (!product.affectedRows) return { valid: false, error: "Produto não criado." };
    return { valid: true };
}

module.exports = { createProduct };
const { getAllProductsDb, createProductDb, updateProductDb, deleteProductDb } = require("../repository/productRepository.js");

async function getAllProducts() {
    const [rows] = await getAllProductsDb();
    if (rows.length === 0) return { valid: false, error: "Não há produtos criados." };
    return { valid: true, res: rows };
}

async function createProduct(name, price, url, imgPath, categoryId) {
    const [rows] = await createProductDb(name, price, url, imgPath, categoryId);
    if (!rows.affectedRows) return { valid: false, error: "Produto não criado." };
    return { valid: true };
}

async function updateProduct(productObject) {
    const { name, price, url, imgPath, categoryId } = productObject;
    const [rows] = await updateProductDb(name, price, url, imgPath, categoryId);
    if (!rows.affectedRows) return { valid: false, error: "Produto não atualizado." };
    return { valid: true };
}

async function deleteProduct(productId) {
    const [rows] = await deleteProductDb(productId);
    if (!rows.affectedRows) return { valid: false, error: "Produto não excluído." };
    return { valid: true };
}

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
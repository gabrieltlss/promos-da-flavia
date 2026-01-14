const { getAllProductsDb, createProductDb, updateProductDb, deleteProductDb } =
    require("../repository/productRepository.js");

async function getAllProducts() {
    const [rows] = await getAllProductsDb();
    if (rows.length === 0) {
        return { valid: false, error: "Não há produtos criados." };
    }
    return { valid: true, res: rows };
}

async function createProduct(name, price, url, img, categoryId) {
    const [rows] = await createProductDb(name, price, url, img, categoryId);
    if (!rows.affectedRows) {
        return { valid: false, error: "Produto não criado." };
    }
    return { valid: true };
}

async function updateProduct(productObject) {
    const { name, price, url, img, categoryId, productId } = productObject;
    const [rows] = await updateProductDb(
        name,
        price,
        url,
        img,
        categoryId,
        productId,
    );
    if (!rows.affectedRows) {
        return { valid: false, error: "Produto não atualizado." };
    }
    return { valid: true };
}

async function deleteProduct(productId) {
    const [rows] = await deleteProductDb(productId);
    if (!rows.affectedRows) {
        return { valid: false, error: "Produto não excluído." };
    }
    return { valid: true };
}

function joinTables(products, categories) {
    const populated = products.map((prod) => {
        let categoryName = null;
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === prod["category_id"]) {
                categoryName = categories[i].name;
                break;
            }
        }
        return { ...prod, categoryName };
    });
    return populated;
}

function getRecentProducts(productsRows) {
    const date = new Date();
    const recentDay = date.getDate() - 5;
    const recentProd = productsRows.filter((prod) =>
        prod["created_at"].getDate() > recentDay
    );
    return recentProd.length;
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    joinTables,
    getRecentProducts,
};

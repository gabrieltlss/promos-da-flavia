const { getIndexProducts, getIndexCategories, getCategoryProducts } = require(
    "../repository/index-repository",
);

async function indexProducts() {
    const [rows] = await getIndexProducts();
    if (rows.length === 0) {
        return { valid: false, error: "Não há produtos cadastrados." };
    }
    return { valid: true, res: rows };
}

async function indexCategories() {
    const [rows] = await getIndexCategories();
    if (rows.length === 0) {
        return { valid: false, error: "Não há categorias cadastradas." };
    }
    return { valid: true, res: rows };
}

async function categoryProducts() {
    const [rows] = await getCategoryProducts();
    if (rows.length === 0) {
        return { valid: false, error: "Não há produtos cadastrados." };
    }
    return { valid: true, res: rows };
}

module.exports = { indexProducts, indexCategories, categoryProducts };

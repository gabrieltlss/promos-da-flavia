const {
    getAllCategoriesDb,
    getSingleCategoryDb,
    createCategoryDb,
    updateCategoryDb,
    deleteCategoryDb,
} = require("../repository/categoryRepository");

async function getAllCategories() {
    const [rows] = await getAllCategoriesDb();
    if (rows.length === 0) {
        return { valid: false, error: "Não há categorias cadastradas." };
    }
    return { valid: true, res: rows };
}

async function getCategoriesLength() {
    const [rows] = await getAllCategoriesDb();
    if (rows.length === 0) return 0;
    return rows.length;
}

async function getSingleCategory(categoryId) {
    const [rows] = await getSingleCategoryDb(categoryId);
    if (rows.length === 0) {
        return { valid: false, error: "A categoria informada não existe." };
    }
    return { valid: true, res: rows[0] };
}

async function createCategory(name) {
    const [rows] = await createCategoryDb(name);
    if (!rows.insertId) return { valid: false, error: "Categoria não criada." };
    return { valid: true };
}

async function updateCategory(categoryId, categoryName) {
    const [rows] = await updateCategoryDb(categoryId, categoryName);
    // Estou incerto quando a 'affectedRows' abaixo.
    if (!rows.affectedRows) {
        return { valid: false, error: "Categoria não atualizada." };
    }
    return { valid: true };
}

async function deleteCategory(categoryId) {
    const [rows] = await deleteCategoryDb(categoryId);
    if (!rows.affectedRows) {
        return { valid: false, error: "Categoria não excluída." };
    }
    return { valid: true };
}

module.exports = {
    getAllCategories,
    getCategoriesLength,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};

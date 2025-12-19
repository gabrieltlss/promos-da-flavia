const { poolFunc } = require("../database/database");

const pool = poolFunc();

function getAllCategoriesDb() {
    return pool.execute("SELECT * FROM category;");
}

function getSingleCategoryDb(categoryId) {
    return pool.execute(
        "SELECT * FROM category WHERE id = ?;",
        [categoryId]
    );
}

function createCategoryDb(name) {
    return pool.execute(
        "INSERT INTO category (name) VALUES (?);",
        [name]
    );
}

function updateCategoryDb(categoryId, categoryName) {
    return pool.execute(
        "UPDATE category SET name = ? WHERE id = ?;",
        [categoryName, categoryId]
    );
}

function deleteCategoryDb(categoryId) {
    return pool.execute(
        "DELETE FROM category WHERE id = ?;",
        [categoryId]
    );
}

module.exports = { getAllCategoriesDb, getSingleCategoryDb, createCategoryDb, updateCategoryDb, deleteCategoryDb };
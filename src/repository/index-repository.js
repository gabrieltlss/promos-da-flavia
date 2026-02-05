const { poolFunc } = require("../database/database");
const pool = poolFunc();

function getIndexProducts() {
    return pool.execute("SELECT * FROM products ORDER BY date DESC LIMIT 3;");
}

function getIndexCategories() {
    return pool.execute("SELECT * FROM category ORDER BY name LIMIT 3;");
}

module.exports = { getIndexProducts, getIndexCategories };

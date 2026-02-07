const { poolFunc } = require("../database/database");
const pool = poolFunc();

function getIndexProducts() {
    return pool.execute("SELECT * FROM products ORDER BY date DESC LIMIT 3;");
}

function getIndexCategories() {
    return pool.execute("SELECT * FROM category ORDER BY name LIMIT 3;");
}

function getCategoryProducts() {
    return pool.execute("SELECT c.name as 'category', p.name, p.price, p.link, p.img FROM category c JOIN products p ON p.category_id = c.id;");
}

module.exports = { getIndexProducts, getIndexCategories, getCategoryProducts };

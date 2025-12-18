const { clientFunc, poolFunc } = require("../database/database");

const pool = poolFunc();

function getProductsDb() { }

// Parece que não preciso de um async para retornar promise neste caso;
// pool.execute já o faz.
function createProductDb(id, name, price, url, imgPath) {
    return pool.execute(
        "INSERT INTO products (id, name, price, link, img) VALUES (?, ?, ?, ?, ?);",
        [id, name, price, url, imgPath]
    );
}

function updateProductDb() { }

function deleteProductDb() { }

module.exports = { getProductsDb, createProductDb };
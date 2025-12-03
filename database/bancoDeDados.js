const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

async function client() {
    const cliente = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USUARIO_BD,
        password: process.env.SENHA_BD,
        database: process.env.BANCO_DE_DADOS
    })
    return cliente;
}

function pool() {
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USUARIO_BD,
        password: process.env.SENHA_BD,
        database: process.env.BANCO_DE_DADOS
    })
    return pool;
}

module.exports = { client, pool };
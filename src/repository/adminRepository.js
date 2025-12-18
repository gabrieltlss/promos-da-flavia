const { clientFunc, poolFunc } = require("../database/database");

const pool = poolFunc();

function getAdminDb(email) {
    return pool.execute("SELECT * FROM user WHERE email = ?;", [email]);
}

function createAdminDb(email, password) {
    return pool.execute(
        "INSERT INTO user (email, password) VALUES (?, ?);",
        [email, password]
    );
}

async function deleteAdminDb(email) {
    const [result] = await pool.execute("DELETE FROM user WHERE email = ?;");
    return result;
}

module.exports = { getAdminDb, createAdminDb, deleteAdminDb };
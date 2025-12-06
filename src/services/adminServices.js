const { User } = require("../model/User");
const { getAdmin } = require("../repository/adminRepository");

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {boolean}
 */

function validateCredentials(email, password) {
    if (
        email.length === 0 ||
        !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g)
    ) { throw new Error("Formato de e-mail inválido.") }

    if (
        password.length === 0 || password.length < 8 ||
        password.match(/\s/g) || !password.match(/[0-9]/g) ||
        !password.match(/[a-zA-z]/g) || !password.match(/\W/g)
    ) { throw new Error("Formato de senha inválida") }

    return true;
}

async function getUser(email) {
    const userExist = await getAdmin(email);
    if (!userExist) throw new Error("Usuário não existe.");
    return userExist;
}

async function loginUser(userEmail, userPassword) {
    validateCredentials(userEmail, userPassword);
    const user = await getUser(userEmail);
    const { id, email, password } = user;
    return new User(id, email, password);
}

module.exports = { loginUser };
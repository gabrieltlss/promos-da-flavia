const uuid = require("uuid");
const uuidV4 = uuid.v4;

// Validações de entrada
function validateEmail(email) {
    if (
        email.length === 0 ||
        !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g)
    ) return false;
    return true;
}

function validatePassword(password) {
    if (
        password.length === 0 || password.length < 8 ||
        password.match(/\s/g) || !password.match(/[0-9]/g) ||
        !password.match(/[a-zA-z]/g) || !password.match(/\W/g)
    ) return false;
    return true;
}

function validateInputs(email, password) {
    const emailRes = validateEmail(email);
    const passwordRes = validatePassword(password);
    if (!emailRes) return { valid: false, error: "E-mail inválido." };
    if (!passwordRes) return { valid: false, error: "Senha inválida." };
    return { valid: true };
}

// Validações e funções de produtos
function validateName(name) {
    if (name.length === 0 || typeof name !== "string" || name.match(/[<>!@#$%¨&*°º]/g)) { return false }
    return true;
}

function validatePrice(price) {
    if (typeof price !== "number") { return false }
    return true;
}

function validateProductFields(name, price) {
    const nameRes = validateName(name);
    const priceRes = validatePrice(price);
    if (!nameRes) return { valid: false, error: "Campo de nome inválido." };
    if (!priceRes) return { valid: false, error: "Campo de preço inválido." };
    return { valid: true };
}

function generateProductId() { return uuidV4() }

module.exports = { validateInputs, validateProductFields, generateProductId };
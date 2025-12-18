const { getAdmin, createAdmin, validatePassword } = require("../services/adminServices");
const { createProduct } = require("../services/productsServices");
const { validateInputs, validateProductFields } = require("../services/validationServices");
const path = require("node:path");

async function authAdmin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const validInputs = validateInputs(email, password);
    if (validInputs.valid === false) {
        res.render("login", { errorMessage: validInputs.error });
        return;
    }

    let user = null;
    try {
        user = await getAdmin(email);
        if (user.valid === false) {
            res.render("login", { errorMessage: user.error });
            return;
        }
    } catch (error) {
        // Devo mudar no futuro - Não mostrar mensagem de erro do BD.
        res.render("login", { errorMessage: error.message });
    }

    const validPassword = validatePassword(password, user.res.password);
    if (validPassword.valid === false) {
        res.render("login", { errorMessage: validPassword.error });
        return;
    }

    const session = { id: user.res.id, email: user.res.email };
    req.session.user = session;
    res.redirect("/admin");
}

// Incompleta, será adaptada a página de admin, com res.render().
async function createNewAdmin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const validInputs = validateInputs(email, password);
    if (validInputs.valid === false) {
        res.render("login", { errorMessage: validInputs.error });
        return;
    }

    try {
        const userExist = await getAdmin(email);
        if (userExist.valid === true) {
            res.json({ message: "Usuário já existe." });
            return;
        }
        const create = await createAdmin(email, password);
        if (create.valid === false) {
            res.json({ status: create.error });
            return;
        }
        res.json("Usuário criado.");
    } catch (error) {
        res.json(error.message);
    }
}

async function createNewProduct(req, res) {
    const productName = req.body.name;
    const productPrice = Number(req.body.price);
    const productUrl = req.body.url;
    const imgPath = path.join(__dirname, "../../public", "img", req.body.filepath);

    console.log(productName, productPrice, productUrl, imgPath);

    const fields = validateProductFields(productName, productPrice);
    if (fields.valid === false) {
        res.render("create", { errorMessage: fields.error });
        return;
    }

    try {
        const newProduct = await createProduct(productName, productPrice, productUrl, imgPath);
        console.log(newProduct);
        if (newProduct.valid === false) {
            res.render("create", { errorMessage: newProduct.error });
            return;
        }
    } catch (error) {
        // Devo mudar no futuro - Não mostrar mensagem de erro do BD.
        console.log(error.message)
        res.render("create", { errorMessage: error.message });
    }

    res.json("Produto criado");
}

module.exports = { authAdmin, createNewAdmin, createNewProduct };
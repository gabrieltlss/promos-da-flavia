const { getAdmin, createAdmin, validatePassword } = require("../services/adminServices");
const { validateInputs } = require("../services/validationServices");

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

async function createProduct(req, res) {
    const body = req.body;
    console.log(req.file.buffer)
    console.log(body);

    res.json(body)
}

module.exports = { authAdmin, createNewAdmin, createProduct };
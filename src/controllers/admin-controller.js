const { loginUser } = require("../services/adminServices");

function login(req, res) {
    try {
        res.render("login");
    } catch (error) {
        res.status(404).json({ error: "Erro ao renderizar visão." });
    }
}

async function authAdmin(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await loginUser(email, password);
        console.log(user);
        res.json(user.getInfo());
    } catch (error) {
        res.render("login", { errorMessage: error.message });
    }
}

module.exports = { login, authAdmin };
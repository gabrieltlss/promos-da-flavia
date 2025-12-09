function loginPage(req, res) {
    try {
        res.render("login");
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

function adminPage(req, res) {
    try {
        res.render("admin");
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

async function createProductPage(req, res) {
    try {
        res.render("create");
    } catch (error) {
        res.status(500).json("Erro ao renderizar view.");
    }
}

module.exports = { loginPage, adminPage, createProductPage };
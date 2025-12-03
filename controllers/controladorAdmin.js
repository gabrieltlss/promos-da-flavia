async function paginaEntrada(req, res) {
    try {
        res.render("login");
    } catch (error) {
        res.status(404).json({ error: "Erro ao renderizar visão." });
    }
}

async function autenticarAdmin(req, res) {
    try {
        // Fazer limpeza dos dados recebidos pelo formulário (Depois).

    } catch (error) {

    }
}

module.exports = { paginaEntrada, autenticarAdmin };
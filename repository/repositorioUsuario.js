const { client, pool } = require("../database/bancoDeDados");

// Funções para usuário administrados
async function obterUsuario(email) {
    try {
        const [usuario] = await pool.execute(
            "SELECT * FROM usuario WHERE email = ?;",
            [email]
        );
        return usuario[0];
    } catch (error) {
        throw new Error("Erro ao obter usuário");
    }
}

async function criarUsuario(email, senha) {
    try {
        // MySQL não possui função 'returning'. Pensa noutra solução.
        const [resposta] = await pool.execute(
            "INSERT INTO usuario (email, senha) VALUES (?, ?);",
            [email, senha]
        );
        return resposta;
    } catch (error) {
        throw new Error("Erro ao criar usuário");
    }
}

async function excluirUsuario(email) {
    const [resposta] = await pool.execute("DELETE FROM usuario WHERE email = ?;");
    return resposta;
}

module.exports = { obterUsuario, criarUsuario, excluirUsuario };
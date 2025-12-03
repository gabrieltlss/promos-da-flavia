const { clientFunc, poolFunc } = require("../database/bancoDeDados");

const pool = poolFunc();

// Funções para usuário administrados
async function obterUsuario(email) {
    const [usuario] = await pool.execute(
        "SELECT * FROM usuario WHERE email = ?;",
        [email]
    );
    console.log(usuario);
    return usuario[0];
}

async function criarUsuario(email, senha) {
    // MySQL não possui função 'returning'. Pensa noutra solução.
    const [resposta] = await pool.execute(
        "INSERT INTO usuario (email, senha) VALUES (?, ?);",
        [email, senha]
    );
    return resposta;
}

async function excluirUsuario(email) {
    const [resposta] = await pool.execute("DELETE FROM usuario WHERE email = ?;");
    return resposta;
}

module.exports = { obterUsuario, criarUsuario, excluirUsuario };
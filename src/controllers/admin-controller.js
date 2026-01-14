const { getAdmin, createAdmin, validatePassword } = require(
  "../services/adminServices",
);
const { validateInputs } = require("../services/validationServices");

// === Renderização ===
function loginPage(req, res) {
  res.render("login");
}

function adminPage(req, res) {
  res.render("admin");
}

// === Lógica ===
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
    console.log(error.message);
    res.render("login", { loadingError: "Erro ao obter dados do usuário." });
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

async function createNewAdmin(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const validInputs = validateInputs(email, password);
  if (validInputs.valid === false) {
    res.json(validInputs.error);
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

function adminLogout(req, res) {
  req.session.destroy((error) => {
    if (error) {
      req.session.user = null;
      res.redirect("/login");
    }
  });
  res.redirect("/login");
}

module.exports = {
  loginPage,
  adminPage,
  authAdmin,
  createNewAdmin,
  adminLogout,
};

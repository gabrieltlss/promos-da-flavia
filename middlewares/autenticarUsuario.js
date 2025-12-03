function autenticarUsuario(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/admin");
    }
}

module.exports = { autenticarUsuario };
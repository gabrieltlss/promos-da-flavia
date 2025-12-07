function loginAuthMiddleware(req, res, next) {
    if (req.session.user) {
        res.redirect("/admin");
    } else {
        next();
    }
}

function adminAuthMiddleware(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = { loginAuthMiddleware, adminAuthMiddleware };
const express = require("express");
const router = require("./src/routes");
const session = require("express-session");
const path = require("node:path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: (1000 * 60) * 30,
    },
}));

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(
    PORT,
    () => console.log("Servidor inciado em: http://localhost:3000/login"),
);

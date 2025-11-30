const express = require("express");
const roteador = require("./src/routes");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(roteador);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor inciado em: http://localhost:3000"));
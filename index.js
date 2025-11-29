const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = require("./src/routes");

const app = express();
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor inciado em: http://localhost:3000"));
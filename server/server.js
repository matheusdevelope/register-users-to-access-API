const { resolve } = require("path");
const express = require("express");
const cors = require("cors");
require("./database/index");
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(resolve(__dirname, "../dist")));

app.use(routes);
app.listen(3001, () => {
  console.log("Server on http://localhost:3001");
});

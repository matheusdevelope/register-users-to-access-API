const express = require("express");
const { resolve } = require("path");
const Client = require("./controller/Client");
const User = require("./controller/User");
const Middleware = require("./middleware/middleware");
const routes = express.Router();
//routes.use(Middleware);

// Lidar com as solicitações GET feitas à rota /api
routes.get("/api", (req, res) => {
  res.send({ message: "Hello from server!" });
});
routes.post("/api/client", Client.post);

// Todas as outras solicitações GET não tratadas retornarão nosso app em React
routes.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "../dist", "index.html"));
});

//routes.post("/Client", Client.post);

module.exports = routes;

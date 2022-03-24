const jwt = require("jsonwebtoken");
const config = require("../config/auth");

module.exports = (req, res, next) => {
  ///exclude this routes from check of token
  if (
    (req.originalUrl === "/User/Login") |
    (req.originalUrl === "/User/Create")
  )
    return next();

  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No Token Provided" });

  const parts = authHeader.split(" ");
  if (!parts.length === 2)
    return res.status(401).send({ error: "Token Error" });

  const [scheme, token] = parts;
  if (!/Bearer/i.test(scheme))
    return res.status(401).send({ error: "Token malformatted" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Invalid Token" });

    req.userId = decoded.id;
    return next();
  });
};

const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

function generateToken(id) {
  return jwt.sign({ id }, config.secret, {
    expiresIn: 10, //86400,
  });
}
function generateRefreshToken(id) {
  return jwt.sign({ id }, config.secret, {
    expiresIn: 360, //86400,
  });
}

module.exports = {
  async create(req, res) {
    const dados = req.body;
    await User.create(dados)
      .then(function (item) {
        res
          .status(201)
          .json({
            data: item,
            token: generateToken(item.dataValues.id),
            refreshToken: generateRefreshToken(item.dataValues.id),
          });
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
  },

  async get(req, res) {
    await User.findAll({
      attributes: {
        exclude: ["id"],
      },
    })
      .then(function (item) {
        res.status(200).json(item);
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
  },

  async login(req, res) {
    const { Email, Senha } = req.body;
    if (!Email | !Senha) return res.status(400).send({ error: "Body empty" });

    let user = await User.findOne({
      where: {
        Email: Email,
      },
    });

    //verify if exist a user
    if (!Boolean(user)) {
      return res.status(400).send({ error: "User not Found" });
    }
    //verify the pass of user founded
    if (user.dataValues.Senha.toString() !== Senha.toString()) {
      return res.status(400).send({ error: "Invalid Password" });
    }
    //return the user
    delete user.dataValues.Senha;

    res.send({
      data: user,
      token: generateToken(user.dataValues.id),
      refreshToken: generateRefreshToken(user.dataValues.id),
    });
  },
  async refreshToken(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).send({ error: "Token missing" });

    //Get the data of user from token payload
    const data = JSON.parse(Buffer.from(token.split(".")[1], "base64"));

    if (!Boolean(data.id))
      return res.status(400).send({ error: "Payload of Token missing" });

    //verify if exist a user
    let user = await User.findOne({
      where: {
        id: data.id,
      },
    });
    if (!Boolean(user))
      return res.status(400).send({ error: "User not Found" });

    //return the new token
    res.send({ token: generateToken(data.id) });
  },
};

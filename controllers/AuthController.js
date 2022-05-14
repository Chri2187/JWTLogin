require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  const hashedPwd = bcrypt.hashSync(req.body.pwd, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    pwd: hashedPwd,
  });
  // save user on DB
  user
    .save()
    .then((user) => {
      res.json({ msg: "Utente Inserito" });
    })
    .catch((err) => {
      res.json({ msg: err });
    });
};

const login = (req, res, next) => {
  const { name, email, pwd } = req.body;
  User.findOne({ email: { $eq: email } }).then((user) => {
    if (user) {
      bcrypt.compare(pwd, user.pwd, (err, result) => {
        if (err) {
          res.json({ msg: err });
        }
        if (result) {
          const payload = {
            name: user.name,
          };
          const token = jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: process.env.JWT_LIFE,
          });
          res.json({
            msg: "Login avvenuto con successo",
            user: user.name,
            token,
          });
        } else {
          res.json({
            msg: "Password Errata",
          });
        }
      });
    } else {
      res.json({ msg: "utente non trovato" });
    }
  });
};

module.exports = { register, login };

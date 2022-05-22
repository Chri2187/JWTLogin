require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
  if (req.body.pwd.length > 6) {
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
        res.json({ msg: 'Utente Inserito', user: user.name, token });
      })
      .catch((err) => {
        res.json({ msg: 'Utente Già Inserito', err: err });
      });
  } else {
    res.json({ err: 'Password minimo 6 caratteri' });
    res.send();
  }
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
            msg: 'Login avvenuto con successo',
            user: user.name,
            token,
          });
        } else {
          res.json({
            err: 'Password Errata',
          });
        }
      });
    } else {
      res.json({ err: 'utente non trovato' });
    }
  });
};

module.exports = { register, login };

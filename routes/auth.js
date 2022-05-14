const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/AuthController");

router.post("/register", register, (req, res) => {
  res.send("vadvdavad");
});

router.post("/login", login, (req, res) => {
  res.send("login");
});

module.exports = router;

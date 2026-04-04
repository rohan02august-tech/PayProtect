// controllers/authController.js
const Worker = require("../models/Worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, phone, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await Worker.create({
    name,
    phone,
    password: hashed
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  const user = await Worker.findOne({ phone });
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ error: "Invalid" });

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token });
};
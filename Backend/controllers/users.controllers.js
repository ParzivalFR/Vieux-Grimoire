const bcrypt = require("bcrypt");

const User = require("../models/users.models");

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = new User({
        email: req.body.email,
        password: hash,
      });
      newUser
        .save()
        .then(() => res.status(201).json({ message: "User created!" }))
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.login = (req, res) => {};

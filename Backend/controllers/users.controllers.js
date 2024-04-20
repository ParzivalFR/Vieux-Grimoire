const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

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

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        return res
          .status(401)
          .json({ error: "Mot de passe et/ou identifiant incorrect..." });
      } else {
        bcrypt
          .compare(req.body.password, user.password) // Compare le mot de passe envoyé avec le hash enregistré dans la base de données
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe et/ou identifiant incorrect..." });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "24h",
              }),
            });
          })
          .catch((err) => res.status(500).json({ error: err }));
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v) && !v.includes("@yopmail.com");
      },
      message: (props) =>
        `${props.value} n'est pas un email valide ou l'utilisation de cette adresse est interdite !`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Mot de passe d'au moins 8 caractères, avec au moins une majuscule, un chiffre et un caractère spécial
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.-])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
          v
        );
      },
      message: (props) =>
        `Le mot de passe doit contenir au moins 8 caractères, inclure une majuscule, un chiffre et un caractère spécial !`,
    },
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

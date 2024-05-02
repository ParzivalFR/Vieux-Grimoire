const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        if (validator.isEmail(value)) {
          const domain = value.split("@")[1];
          return !domain.includes("yopmail");
        }
        return false;
      },
      message: "Adresse e-mail invalide",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

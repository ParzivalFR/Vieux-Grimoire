const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const userRoutes = require("./routes/users.routes");
const auth = require("./middlewares/auth.middlewares");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🚀 Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas : ", error);
  });

const app = express();
app.use(express.json()); // Pour analyser les corps de requête au format JSON
app.use(express.urlencoded({ extended: true })); // Pour analyser les corps de requête au format urlencoded
app.use(cors());

// ROUTES DE CONNEXION ET D'INSCRIPTION
app.use("/api/auth", userRoutes);
app.use("/api/auth", userRoutes);

// ROUTES BOOKS
// app.use("api/books", auth, bookRoutes);

module.exports = app;

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// CONNEXION A LA BASE DE DONNEES
connectDB();

app.use(cors());
app.use(express.json()); // Pour analyser les corps de requête au format JSON

// ROUTES
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", require("./routes/users.routes"));
app.use("/api/books", require("./routes/books.routes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

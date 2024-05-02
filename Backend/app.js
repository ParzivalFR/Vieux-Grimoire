const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// CONNEXION A LA BASE DE DONNEES
connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par windowMs
});

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
); // Pour sécuriser les en-têtes HTTP
app.use(cors()); // Pour éviter les erreurs de CORS
app.use(limiter); // Pour éviter les attaques de force brute
app.use(xss()); // Pour éviter les attaques XSS
app.use(express.json()); // Pour analyser les corps de requête au format JSON
app.use(express.urlencoded({ extended: true })); // Pour analyser les corps de requête des formulaires HTML

// ROUTES
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", require("./routes/users.routes"));
app.use("/api/books", require("./routes/books.routes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Pour afficher la documentation Swagger

module.exports = app;

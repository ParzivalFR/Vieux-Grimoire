const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// CONNEXION A LA BASE DE DONNEES
connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(xss());
app.use(express.json()); // Pour analyser les corps de requête au format JSON

// ROUTES
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", require("./routes/users.routes"));
app.use("/api/books", require("./routes/books.routes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

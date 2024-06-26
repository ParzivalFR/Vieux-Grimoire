const express = require("express");
const router = express.Router();

const bookCtrl = require("../controllers/books.controllers");

const auth = require("../middlewares/auth.middlewares");
const multer = require("../middlewares/multer-config");

router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestRating);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, multer, multer.optimizeImage, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.createRating);
router.put("/:id", auth, multer, multer.optimizeImage, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;

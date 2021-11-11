var express = require("express");
var router = express.Router();
const bookController = require("./../controllers/book_controller");
const AppError = require("./../utils/appError");

router
  .route("/")
  .get(bookController.getAllBook)
  .post(bookController.addOneBook);

router
  .route("/:id")
  .get(bookController.getOneBook)
  .delete(bookController.deleteOneBook)
  .patch(bookController.setOneBook);

module.exports = router;

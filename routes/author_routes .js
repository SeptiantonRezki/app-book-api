var express = require("express");
var router = express.Router();
const authorController = require("../controllers/author_controller");
const AppError = require("../utils/appError");

router
  .route("/")
  .get(authorController.getAuthors)
 

module.exports = router;

var express = require("express");
var router = express.Router();
const userController = require("../controllers/user_controller");

router.route("/").get(userController.getUsers).post(userController.addUser);

router.route("/:id").get(userController.getUser);

router.route("/:id/messages/").get(userController.getMessages);

module.exports = router;

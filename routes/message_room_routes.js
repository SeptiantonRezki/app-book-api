var express = require("express");
const messageRoomController = require("../controllers/message_room_controller");
var router = express.Router();

router
  .route("/")
  .get(messageRoomController.getRoomsMessage)
  .post(messageRoomController.addRoomMessage);

router.route("/:id_message_room").get(messageRoomController.getRoomMessage);

module.exports = router;

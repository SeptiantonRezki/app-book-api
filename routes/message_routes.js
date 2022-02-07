var express = require("express");
const messageController = require("../controllers/message_controller");
const messageRoomRouter = require("./../routes/message_room_routes");

const router = express.Router({ mergeParams: true });

router.use("/:id_message/room_message", messageRoomRouter);

router.route("/").get(messageController.getMessages).post(messageController.addMessage);

router.route("/:id_message").get(messageController.getMessage);

module.exports = router;

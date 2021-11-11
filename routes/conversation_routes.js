var express = require("express");
var router = express.Router();
const conversationController = require("../controllers/conversation_controller");

// router.route("/");

router
  .route("/:id_conversation/messages")
  .get(conversationController.getMessagesInConversation)
  .post(conversationController.addMessageToConversation);


  module.exports = router;

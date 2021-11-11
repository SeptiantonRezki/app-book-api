const ConversationPeople = require("../models/conversation_people_model");
const ConversationRoom = require("../models/conversation_room_model");
const Message = require("../models/message_model");
const catchAsync = require("./../utils/catchAsync");

exports.addMessageToConversation = catchAsync(async (req, res, next) => {
  let id_conversation = req.params.id_conversation;
  let id_sender = req.body.id_sender;
  let id_receiver = req.body.id_receiver;
  let message = req.body.message;
  var messages;

  //  search room id
  let checkConversationRoom = ConversationRoom.ConversationRoom({
    id: id_conversation,
  });
  // Room not found
  if (checkConversationRoom.length !== 0) {
    // 1. create room and get room id
    let idNewConversationRoom = await ConversationRoom.addConversationRoom()[0];
    // 2. add peoples to room
    await ConversationPeople.addConversationPeople({
      idNewConversationRoom,
      id_sender,
    });
    await ConversationPeople.addConversationPeople({
      idNewConversationRoom,
      id_receiver,
    });
    // 3. send message
    messages = await Message.addMessage({
      id_conversation: idNewConversationRoom,
      id_sender,
      message,
    });
  }
  //   Room founded
  else {
    messages = await Message.addMessage({
      id_conversation,
      id_sender,
      message,
    });
  }
  //   4. Send all message from room
  return res.status(200).json({
    status: "success",
    data: messages,
  });
});

exports.getMessagesInConversation = catchAsync(async (req, res, next) => {
  let id_conversation = req.params.id;
  var messages = await Message.getMesssagesConversation({ id_conversation });
  res.status(200).json({
    status: "success",
    data: messages,
  });
});

const ConversationPeople = require("../models/conversation_people_model");
const ConversationRoom = require("../models/conversation_room_model");
const Message = require("../models/message_model");
const catchAsync = require("./../utils/catchAsync");

exports.addMessageToConversation = catchAsync(async (req, res, next) => {
  let id_conversation = req.params.id_conversation;
  var id_sender = req.body.id_sender;
  var id_receiver = req.body.id_receiver;
  var message = req.body.message;
  var messages;

  //  search room id
  let checkConversationRoom = await ConversationRoom.getConversationRoom({
    id: id_conversation,
  });
  console.log(checkConversationRoom);
  console.log(checkConversationRoom === undefined); // kalau ada kondisi ini false => data ada
  console.log(checkConversationRoom !== undefined); // kalau ada kondisi ini true => data ada
  // Room not found
  if (checkConversationRoom.length == 0) {
    // 1. create room and get room id
    let idNewConversationRoom = await ConversationRoom.addConversationRoom();
    console.log(idNewConversationRoom[0].id);
    // 2. add peoples to room
    await ConversationPeople.addConversationPeople({
      id_conversation: idNewConversationRoom[0].id,
      id_people: id_sender,
    });
    await ConversationPeople.addConversationPeople({
      id_conversation: idNewConversationRoom[0].id,
      id_people: id_receiver,
    });
    // 3. send message
    messages = await Message.addMessage({
      id_conversation: idNewConversationRoom[0].id,
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
  let id_conversation = req.params.id_conversation;
  var messages = await Message.getMesssagesConversation({ id_conversation });
  res.status(200).json({
    status: "success",
    data: messages,
  });
});

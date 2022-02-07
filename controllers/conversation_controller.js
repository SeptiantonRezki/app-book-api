// const ConversationPeople = require("../models/conversation_people_model");
// const ConversationRoom = require("../models/conversation_room_model");
// const Message = require("../models/message_model");
// const catchAsync = require("./../utils/catchAsync");

// // get all conversation room user sender
// // crate conversation room user a sender
// // delete conversation room




// exports.addMessageToConversation = catchAsync(async (req, res, next) => {
//   let id_conversation = req.params.id_conversation;
//   var id_sender = req.body.id_sender;
//   var id_receiver = req.body.id_receiver;
//   var message = req.body.message;
//   var messages;

//   //  search room id
//   let checkConversationRoom = await ConversationRoom.getConversationRoom({
//     id: id_conversation,
//   });
//   // Room not found
//   if (checkConversationRoom.length == 0) {
//     // 1. create room and get room id
//     let idNewConversationRoom = await ConversationRoom.addConversationRoom();

//     // 2. add peoples to room
//     await ConversationPeople.addConversationPeople({
//       id_conversation: idNewConversationRoom[0].id,
//       id_people: id_sender,
//     });
//     await ConversationPeople.addConversationPeople({
//       id_conversation: idNewConversationRoom[0].id,
//       id_people: id_receiver,
//     });
//     // 3. send message
//     messages = await Message.addMessage({
//       id_conversation: idNewConversationRoom[0].id,
//       id_sender,
//       message,
//     });
//   }
//   //   Room founded
//   else {
//     messages = await Message.addMessage({
//       id_conversation,
//       id_sender,
//       message,
//     });
//   }
//   //   4. Send all message from room
//   return res.status(200).json({
//     status: "success",
//     data: messages,
//   });
// });

// exports.getMessagesInConversation = catchAsync(async (req, res, next) => {
//   let id_conversation = req.params.id_conversation;
//   var messages = await Message.getMesssagesConversation({ id_conversation });
//   res.status(200).json({
//     status: "success",
//     data: messages,
//   });
// });

// exports.getMessageConversation = catchAsync(async (req, res, next) => {
//   let id_conversation = req.params.id_conversation;
//   let id_message = req.params.id_conversation;
//   var message = await Message.getMessage({ id_message, id_conversation });
//   res.status(200).json({
//     status: "success",
//     data: message,
//   });
// });
// exports.getPeopleInConversation = catchAsync(async (req, res, next) => {
//   let id_conversation = req.params.id_conversation;
//   var messages = await ConversationPeople.getPeoplesConversation({
//     id_conversation,
//   });
//   res.status(200).json({
//     status: "success",
//     data: messages,
//   });
// });

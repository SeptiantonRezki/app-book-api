const Message = require("../models/message_model");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const utf8 = require('utf8');

// get all message conversation id
// get message id conversation
// get last message id conversation
// post/create/send message id conversation
// delete message conversation

exports.addMessage = catchAsync(async (req, res, next) => {
  var id_message_room = req.body.id_message_room;
  var id_sender = req.body.id_sender;
  var id_receiver = req.body.id_receiver;
  var message = req.body.message;
  var newMessage;
  // console.log(utf8.decode(message));

  //  search room id
  if (id_sender !== id_receiver) {
    // room undefined
    if (id_message_room === undefined) {
      let checkMessageRoom = await Message.getRoomByIdSenderAndIdReceiver({
        id_sender: id_sender,
        id_receiver: id_receiver,
      });
      // room not found by id sender and receiver
      if (checkMessageRoom[0].id_message_room === undefined) {
        // 1. create room and get room id
        let newIdRoom = await Message.createMessageRoom();
        newMessage = Message.addMessage({
          id_message_room: newIdRoom,
          id_sender: id_sender,
          id_receiver: id_receiver,
          message: message,
        });
      } else {
        // 2. room found by id sender and receiver
        newMessage = await Message.addMessage({
          id_message_room: checkMessageRoom[0].id_message_room,
          id_sender: id_sender,
          id_receiver: id_receiver,
          message: message,
        });
      }
    }
    // room defined
    else if (id_message_room !== undefined) {
      let checkMessageRoom = await Message.getMessageRoom({
        id_message_room: id_message_room,
      });
      // Room not found by id room Message
      if (checkMessageRoom[0].id === undefined) {
        // 1. create room and get room id
        let newIdRoom = await Message.createMessageRoom();
        newMessage = Message.addMessage({
          id_message_room: newIdRoom,
          id_sender: id_sender,
          id_receiver: id_receiver,
          message: message,
        });
      }
      // Room found by id room Message
      else {
        newMessage = await Message.addMessage({
          id_message_room: checkMessageRoom[0].id,
          id_sender: id_sender,
          id_receiver: id_receiver,
          message: message,
        });
      }
    }

    //   4. Send all message from room
    return res.status(200).json({
      status: "success",
      data: newMessage,
    });
  } else {
    return next(new AppError("Something wrong", 404));
  }
});

exports.getMessage = catchAsync(async (req, res, next) => {
  let id_message = req.params.id_message;
  var messages = await Message.getMessage({ id_message });
  res.status(200).json({
    status: "success",
    data: messages,
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  // tetap get message in berdasarkan id room message => berhasil
  var messages = [];
  let id_message_room = req.body.id_message_room;
  let id_sender = req.body.id_sender;
  let id_receiver = req.body.id_receiver;

  if (id_sender !== undefined && id_receiver !== undefined) {
    if (id_sender !== id_receiver) {
      if (id_message_room == undefined) {
        // get message room by id sender and recaiver
        let checkRoomMessage = await Message.getRoomByIdSenderAndIdReceiver({
          id_sender: id_sender,
          id_receiver: id_receiver,
        });
        // room found by id sender and receiver
        if (checkRoomMessage[0].id_message_room === undefined) {
        } else {
          messages = await Message.getMesssages({
            id_message_room: checkRoomMessage[0].id_message_room,
          });
        }
        // kalau gak ada berarti kosong aja
      } else if (id_message_room !== undefined) {
        //  search room id by id room
        let checkMessageRoom = await Message.getMessageRoom({
          id_message_room: id_message_room,
        });
        // Room not found
        if (checkMessageRoom[0].id === undefined) {
        } else {
          messages = await Message.getMesssages({
            id_message_room: checkMessageRoom[0].id,
          });
        }
      }
    }
  }

  if (messages.length != 0) {
    return res.status(200).json({
      status: "success",
      room: messages[0].id_message_room,
      data: messages,
    });
  }
  return res.status(200).json({
    status: "success",
    room: null,
    data: messages,
  });
});

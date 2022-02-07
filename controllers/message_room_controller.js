const Message = require("../models/message_model");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getRoomMessage = catchAsync(async (req, res, next) => {
  var id_message_room = req.params.id_message_room;
  var room = await Message.getMessageRoom({ id_message_room: id_message_room });
  if (room != undefined) {
    return res.status(200).json({
      status: "success",
      data: room,
    });
  }
  return next(new AppError({ message: "something error", statusCode: 404 }));
});

exports.getRoomsMessage = catchAsync(async (req, res, next) => {
  var rooms = await Message.getMessageRooms();
  return res.status(200).json({
    status: "success",
    data: rooms,
  });
});

exports.addRoomMessage = catchAsync(async (req, res, next) => {
  var idRoom = await Message.createMessageRoom();
  if (room != undefined) {
    return res.status(201).json({
      status: "success",
      data: {
        id: idRoom,
      },
    });
  }
  return next(new AppError({ message: "something error", statusCode: 404 }));
});
exports.deleteRoomMessage = () => {};

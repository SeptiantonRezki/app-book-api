const connection = require("../configuration/db");
const Message = require("../models/message_model");
const User = require("../models/user_model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addUser = catchAsync(async (req, res, next) => {
  var name = req.body.name;
  var user = await User.addUser({ name: name });
  return res.status(201).json({
    status: "success",
    data: user[0],
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  var id = req.params.id;
  var user = await User.getUser({ id: id });
  if (user[0]) {
    return res.status(200).json({
      status: "success",
      data: user[0],
    });
  }
  return res.status(404).json({
    status: "error",
    message: "user not found!",
  });
});
exports.getUsers = catchAsync(async (req, res, next) => {
  var users = await User.getUsers();
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {});
exports.updateUser = catchAsync(async (req, res, next) => {});

// message
exports.getMessages = catchAsync(async (req, res, next) => {
  let id_sender = req.params.id;
  var messageList = await Message.getMessageSender({ id_sender });
  return res.status(200).json({
    status: "success",
    length: messageList.length,
    data: messageList,
  });
});

const AppError = require("./../utils/appError");

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // if (process.env.NODE_ENV === "development") {
  console.log(err);
  sendErrorDev(err, req, res);
  // } else if (process.env.NODE_ENV === "production") {
  // let error = { ...err };
  // error.message = err.message;
  // sendErrorProd(error, req, res);
  // }
};

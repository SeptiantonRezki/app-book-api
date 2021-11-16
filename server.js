process.on("uncaughtException", (err) => {
  console.log(err.name, err.message, err);
  console.log("UNCAUGHT EXCEPTION * Shutting down.....");
  process.exit(1);
});

const app = require("./app");
const connection = require("./configuration/db");

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
});

// const server = app.listen(80, "192.168.137.1",() => {
//   console.log("server anda telah berjalan");
// });
const server = app.listen(55521,() => {
    console.log("server anda telah berjalan");
  }); 

//ERROR
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION * Shutting down.....");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});

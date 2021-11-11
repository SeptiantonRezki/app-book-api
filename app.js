const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const bookRoutes = require("./routes/book_routes");
const authorRoutes = require("./routes/author_routes ");
const conversationRoutes = require("./routes/conversation_routes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

app.use(cors());

// Serving static files
app.use(express.static(path.join(__dirname, "public")));
// GET FILE => http://localhost:5021/img/ads/ads-1632389819493.jpeg

// MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10kb" }));

// ROUTE
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/author", authorRoutes);
app.use("/api/v1/conversation", conversationRoutes);

// HANDLE ERROR
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

const Book = require("../models/book_model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAuthors = catchAsync(async (req, res, next) => {
  let author = "";
  if (req.query.author) {
    if (req.query.author !== "") {
      author = req.query.author;
      var authorBooks = await Book.getBooksAuthor({ author: author });
      return res.status(200).json({
        status: "success",
        length: authorBooks.length,
        data: authorBooks,
      });
    }
  }
  var allAuthor = await Book.getAuthors();
  return res.status(200).json({
    status: "success",
    length: allAuthor.length,
    data: allAuthor,
  });
});

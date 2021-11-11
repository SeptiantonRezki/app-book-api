const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Book = require("../models/book_model");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

// var url_image = "http://192.168.137.1/";
// var url_image = "http://localhost:5021/";
var url_image = "http://192.168.56.1:5021/";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `book-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  console.log("berhasil");
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadBookImage = upload.single("image-book");
exports.getImageDatabaseAndRemove = (req, res, next) => {
  connection.query(
    "SELECT * FROM book WHERE id = ?",
    [req.params.id],
    (error, results, fields) => {
      removeImageStorage(results[0].image_url, res, next);
    }
  );
};

const removeImageStorage = (pathFileImage, res, next) => {
  var pathFile = path.join(__dirname, `../public/${pathFileImage}`);
  console.log(pathFile);
  try {
    fs.unlinkSync(pathFile);
    next();
  } catch (err) {
    return next(new AppError("Something wrong", 500));
  }
};

exports.getOneBook = catchAsync(async (req, res, next) => {
  if (req.params.id) {
    if (isNaN(+req.params.id)) {
      return next(new AppError("Id must be number", 404));
    }
  } else {
    return next(new AppError("Id book is not found", 404));
  }
  var dataBook = await Book.getBookOne({ id: req.params.id });
  console.log(dataBook[0].image_link);
  dataBook[0].image_link = `${url_image}${dataBook[0].image_link}`;
  return res.status(200).json({
    status: "success",
    data: dataBook[0],
  });
});

exports.getAllBook = catchAsync(async (req, res, next) => {
  let limit = 10;
  let skip = 0;
  let search = "";
  if (req.query.limit) {
    if (req.query.limit == "no-limit") {
      limit = "no-limit";
    } else if (!isNaN(+req.query.limit)) {
      limit = +req.query.limit;
    }
  }
  if (req.query.skip) {
    if (!isNaN(+req.query.skip)) {
      skip = +req.query.skip;
    }
  }
  if (req.query.search) {
    search = req.query.search;
  }

  var allDataBook = await Book.getAllBook({ limit, skip, search });
  var dataResult = allDataBook.map((value, index) => {
    value.image_link = `${url_image}${value.image_link}`;
    return value;
  });
  return res.status(200).json({
    status: "success",
    length: dataResult.length,
    data: dataResult,
  });
});
exports.deleteOneBook = catchAsync(async (req, res, next) => {
  if (req.params.id) {
    if (isNaN(+req.params.id)) {
      return next(new AppError("Id must be number", 404));
    }
  } else {
    return next(new AppError("Id book is not found", 404));
  }
  var id = req.params.id;
  await Book.deleteOneBook({ id });
  return res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.addOneBook = catchAsync(async (req, res, next) => {
  if (req.body.title === "" || req.body.author === "") {
    return next(new AppError("You must form field title and author", 404));
  }
  var dataBookNew = await Book.addOneBook({
    author: req.body.author,
    country: req.body.country,
    imageLink: req.body.imageLink,
    language: req.body.language,
    link: req.body.link,
    pages: req.body.pages,
    title: req.body.title,
    year: req.body.year,
  });
  dataBookNew[0].image_link = `${url_image}${dataBookNew[0].image_link}`;
  return res.status(201).json({
    status: "success",
    data: dataBookNew,
  });
});

exports.setOneBook = catchAsync(async (req, res, next) => {
  if (req.body.title === "" || req.body.author === "") {
    return next(new AppError("You must form field title and author", 404));
  }
  var dataBookNew = await Book.setOneBook({
    id: req.params.id,
    author: req.body.author,
    country: req.body.country,
    imageLink: req.body.imageLink,
    language: req.body.language,
    link: req.body.link,
    pages: req.body.pages,
    title: req.body.title,
    year: req.body.year,
  });
  dataBookNew[0].image_link = `${url_image}${dataBookNew[0].image_link}`;
  return res.status(201).json({
    status: "success",
    data: dataBookNew,
  });
});

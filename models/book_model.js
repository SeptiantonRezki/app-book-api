const connection = require("../configuration/db");
const AppError = require("./../utils/appError");

class Book {
  static getBookOne({ id }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM book WHERE id = ?;",
        id,
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getAuthors() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(title) AS books, author FROM book GROUP BY author",
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getBooksAuthor({ author }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM `book` WHERE author = ?",
        [author],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getAllBook({ limit, skip, search }) {
    let query = `SELECT * FROM book WHERE title LIKE '%${search}%' LIMIT ? OFFSET ?;`;
    let array = [limit, skip];
    if (limit === "no-limit") {
      query = `SELECT * FROM book WHERE title LIKE '%${search}%';`;
      array = [];
    }
    return new Promise((resolve, reject) => {
      connection.query(query, array, function (error, results, fields) {
        if (error) reject(error);
        resolve(results);
      });
    });
  }
  static deleteOneBook({ id }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM book WHERE id = ?;",
        id,
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static addOneBook({
    author,
    country,
    imageLink,
    language,
    link,
    pages,
    title,
    year,
  }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO book (id, author, country,  image_link, language, link,  pages, title, year ) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
        [author, country, imageLink, language, link, pages, title, year],
        async (error, results, fields) => {
          if (error) reject(error);
          var dataBookAdd = await Book.getBookOne({
            id: results.insertId,
          });
          resolve(dataBookAdd);
        }
      );
    });
  }
  static setOneBook({
    author,
    country,
    imageLink,
    language,
    link,
    pages,
    title,
    year,
    id,
  }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE book SET author = ?, country = ?, image_link = ?, language = ?, link = ?, pages = ?, title = ?, year = ? WHERE id = ?;",
        [author, country, imageLink, language, link, pages, title, year, id],
        async (error, results, fields) => {
          if (error) reject(error);
          var dataBookAdd = await Book.getBookOne({ id });
          resolve(dataBookAdd);
        }
      );
    });
  }
}

module.exports = Book;

const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const connection = require("./db");
connection.query(`CREATE DATABASE IF NOT EXISTS db_book`, (error) => {
  if (error) throw error;
});
connection.query(
  `CREATE TABLE IF NOT EXISTS book ( id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, author VARCHAR(100), country VARCHAR(100), image_link VARCHAR(200), language VARCHAR(100), link VARCHAR(200), pages INT(11), title VARCHAR(100), year YEAR);`,
  (error) => {
    if (error) throw error;
  }
);
const addData = async () => {
  try {
    const dataString = await readFile(
      __dirname + "/../data/books.json",
      "utf8"
    );
    var dataJson = JSON.parse(dataString);
    for (const key in dataJson) {
      if (Object.hasOwnProperty.call(dataJson, key)) {
        connection.query(
          "INSERT INTO book (id, author, country,  image_link, language, link,  pages, title, year ) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            dataJson[key].author,
            dataJson[key].country,
            dataJson[key].imageLink,
            dataJson[key].language,
            dataJson[key].link,
            dataJson[key].pages,
            dataJson[key].title,
            dataJson[key].year,
          ],
          async (error, results, fields) => {
            if (error) console.log(error);
          }
        );
      }
    }
  } catch (e) {
    console.log(e.toString());
  }
};
addData();

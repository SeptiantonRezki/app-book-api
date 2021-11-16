const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const connection = require("./db");
connection.query(`CREATE DATABASE IF NOT EXISTS db_book`, (error) => {
  if (error) throw error;
});
connection.query(
  `CREATE TABLE IF NOT EXISTS book (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author varchar(100) NOT NULL,
    country varchar(100) NOT NULL,
    image_link varchar(200) NOT NULL,
    language varchar(100) NOT NULL,
    link varchar(200) NOT NULL,
    pages int(11) NOT NULL,
    title varchar(200) NOT NULL,
    year year(4) NOT NULL
  )`,
  (error) => {
    if (error) throw error;
  }
);

connection.query(
  `
  CREATE TABLE  IF NOT EXISTS user (
    id int(11) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
    name varchar(250) NOT NULL
  )
  `,
  (error) => {
    if (error) throw error;
  }
);

connection.query(
  `
  CREATE TABLE IF NOT EXISTS  conversation_room (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `,
  (error) => {
    if (error) throw error;
  }
);
connection.query(
  `
  CREATE TABLE IF NOT EXISTS message (
    id_message int(11) NOT NULL NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_conversation int(11) ,
    id_sender int(11) NOT NULL,
    message varchar(500) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_conversation) REFERENCES conversation_room (id),
    FOREIGN KEY (id_sender) REFERENCES user (id)
  )
  `,
  (error) => {
    if (error) throw error;
  }
);
connection.query(
  `CREATE TABLE IF NOT EXISTS conversation_people (
    id int(11) NOT NULL ,
    id_people int(11) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES conversation_room (id),
    FOREIGN KEY (id_people) REFERENCES user (id)
  )`,
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

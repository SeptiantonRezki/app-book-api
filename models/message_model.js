const connection = require("../configuration/db");

class Message {
  static addMessage({ id_conversation, id_sender, message }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO message (id_message, id_conversation, id_sender, message, time) VALUES (NULL, ?, ?, ?, current_timestamp());",
        [id_conversation, id_sender === undefined ? 1 : id_sender, message === undefined ? "default message" : message],
        async (error, results, fields) => {
          if (error) reject(error);
          var newMessage = await Message.getMessage({
            id_message: results.insertId,
          });
          resolve(newMessage[0]);
        }
      );
    });
  }
  static getMessage({ id_message }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM message WHERE id_message = ?;",
        [id_message],
        async (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getMesssagesConversation({ id_conversation }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM message WHERE id_conversation = ?",
        [id_conversation],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}

module.exports = Message;

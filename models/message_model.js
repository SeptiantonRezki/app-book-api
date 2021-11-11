const connection = require("../configuration/db");

class Message {
  static addMessage({ id_conversation, id_sender, message }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO message (id_conversation, id_sender, message, time) VALUES (?, ?, ?, current_timestamp());",
        [id_conversation, id_sender, message],
        async (error, results, fields) => {
          if (error) reject(error);
          let messages = await Message.getMesssagesConversation({
            id_conversation,
          });
          resolve(messages);
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

const connection = require("../configuration/db");

class ConversationRoom {
  static addConversationRoom() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO conversation_room(id) VALUES(NULL)",
        async (error, results, fields) => {
          if (error) reject(error);
          var conversationRoom = await ConversationRoom.getConversationRoom({
            id: results.insertId,
          });
          resolve(conversationRoom);
        }
      );
    });
  }
  static getConversationRoom({ id }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM conversation_room WHERE id = ?",
        [id],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}
module.exports = ConversationRoom;

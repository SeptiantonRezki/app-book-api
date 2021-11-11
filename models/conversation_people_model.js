const connection = require("../configuration/db");

// ORANG ORANG YANG MENERIMA UPDATE MESSAGE TERBARU
// orang yang akan di tambahkan ke message group/ Message private
class ConversationPeople {
  static addConversationPeople({ id_conversation, id_people }) {
    return new Promise(async (resolve, reject) => {
      var checkUser = await this.chechkPeopleIsAddedInConversation({
        id_conversation,
        id_people,
      });
      if (checkUser.length == 0) {
        connection.query(
          "INSERT INTO conversation_people(id, id_people) VALUES (?, ?)",
          [id_conversation, id_people],
          async (error, results, fields) => {
            if (error) reject(error);
            let users = await ConversationPeople.getPeoplesConversation({
              id_conversation: results.insertId,
            });
            resolve(users);
          }
        );
      } else {
        let users = await ConversationPeople.getPeoplesConversation({
          id_conversation: results.insertId,
        });
        resolve(users);
      }
    });
  }
  static chechkPeopleIsAddedInConversation({ id_conversation, id_people }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM conversation_people WHERE id = ? AND id_people = ?",
        [id_conversation, id_people],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getPeoplesConversation({ id_conversation }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM conversation_people WHERE id = ?",
        [id_conversation],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}
module.exports = ConversationPeople;

const connection = require("../configuration/db");

// get room message dan all message => cari id dimana id sender dan id_receiver
// ADD message di room

class Message {
  static addMessage({ id_message_room, id_sender, id_receiver, message }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO message (id_message_room, id_sender, id_receiver, message, time, id_message) VALUES (?, ?, ?, ?, current_timestamp(), NULL);",
        [id_message_room, id_sender, id_receiver, message],
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
  static getMesssages({ id_message_room }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM message WHERE id_message_room = ?",
        [id_message_room],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getRoomByIdSenderAndIdReceiver({ id_sender, id_receiver }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM message WHERE id_sender = ? AND id_receiver = ? OR id_sender = ? AND id_receiver = ? GROUP BY id_message_room",
        [id_sender, id_receiver, id_receiver, id_sender],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static createMessageRoom() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO message_room (id, time_message_room) VALUES (NULL, current_timestamp());",
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results.insertId);
        }
      );
    });
  }
  static getMessageRoom({ id_message_room }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM message_room WHERE id = ?",
        [id_message_room],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getMessageRooms() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM message_room",
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getMessageSender({ id_sender }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT m.id_message_room, m.id_sender, m.id_receiver, m.message, m.id_message, max(m.time) as time, s.id, s.name FROM message as m INNER JOIN user as s ON m.id_receiver = s.id WHERE m.id_sender = ? GROUP BY m.id_message_room",
        [id_sender],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}
// const checkDatabase = async () => {
//   let id_sender = 1;
//   let id_receiver = 3;
//   let idRoom = await Message.getRoomByIdSenderAndIdReceiver({
//     id_sender: id_sender,
//     id_receiver: id_receiver,
//   });
//   if (idRoom.length != 0) {
//     console.log(idRoom[0].id_message_room);
//     let messages = await Message.getMesssages({
//       id_message_room: idRoom[0].id_message_room,
//     });
//     console.log(messages);
//   } else if (id_sender !== id_receiver) {
//     let newIdRoom = await Message.createMessageRoom();
//     console.log(newIdRoom);
//     let messages = await Message.getMesssages({
//       id_message_room: newIdRoom,
//     });
//     console.log(messages);
//   } else {
//     console.log("something wrong");
//   }
// };
// checkDatabase();
module.exports = Message;

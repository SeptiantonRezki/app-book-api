const connection = require("../configuration/db");

class User {
  static addUser({ name }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO user(id, name) VALUES(NULL, ?)",
        [name],
        async (error, results, fields) => {
          if (error) reject(error);
          var user = await User.getUser({
            id: results.insertId,
          });
          resolve(user);
        }
      );
    });
  }
  static getUser({ id }) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE id = ?",
        [id],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  static getUsers() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM user", (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }
}

module.exports = User;

const mysql = require("mysql");
const statusApp = require("../utils/status");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: statusApp === "development" ? "" : "8%tmnN!t7",
  database: "db_book",
  charset : 'utf8mb4'
});

module.exports = connection;

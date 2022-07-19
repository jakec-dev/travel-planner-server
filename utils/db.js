const mysql = require("mysql2");
const { database } = require("../config");

let connection;
const connect = () => {
  connection =
    connection ||
    mysql.createPool({
      ...database,
      connectionLimit: 10,
    });
  return connection;
};

const disconnect = () => {
  if (!connection) {
    return;
  }
  connection.end();
};

const query = (sql, args) => {
  if (!connection) {
    connect();
  }
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { connect, disconnect, query };

const mysql = require("mysql2");
const { database } = require("../config");

const dbConnect = (databaseName) => {
  const con = mysql.createConnection({
    ...database,
    database: databaseName,
  });
  return con;
};

module.exports = dbConnect;

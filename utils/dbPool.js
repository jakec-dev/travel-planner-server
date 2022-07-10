const mysql = require("mysql2");
const { database } = require("../config");

const pool = mysql.createPool({
  ...database,
  connectionLimit: 10,
});

module.exports = pool;

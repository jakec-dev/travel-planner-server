const mysql = require("mysql2");
const { database } = require("../config");

const con = mysql.createConnection({
  ...database,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

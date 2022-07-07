const dbConnect = require("./dbConnect");

const dbReadItem = (itemId) => {
  const con = dbConnect("travel-planner-db");
  const sql = `SELECT * FROM items WHERE id=${itemId}`;
  con.query(sql, (queryErr, result) => {
    if (queryErr) throw queryErr;
    return result;
  });
  con.end();
};

const dbReadItems = () => {
  const con = dbConnect("travel-planner-db");
  const sql = "SELECT * FROM items";
  con.query(sql, (queryErr, result) => {
    if (queryErr) throw queryErr;
    return result;
  });
  con.end();
};

module.exports = { dbReadItem, dbReadItems };

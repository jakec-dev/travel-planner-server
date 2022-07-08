const pool = require("../utils/dbPool");

const getItemRecords = (itemIds) => {
  let sqlFilter = "";
  if (Array.isArray(itemIds)) {
    const itemIdList = itemIds.join(",");
    sqlFilter = `WHERE id IN (${itemIdList})`;
  } else if (typeof itemIds === "number") {
    sqlFilter = `WHERE id=${itemIds}`;
  }
  const sql = `SELECT * FROM items ${sqlFilter}`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { getItemRecords };

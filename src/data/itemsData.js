const db = require("../utils/db");

const selectItemRecords = async (itemIds) => {
  let sql;
  let params;
  if (Array.isArray(itemIds) || typeof itemIds === "number") {
    sql = "SELECT * FROM items WHERE id IN (?)";
    params = [itemIds];
  } else {
    sql = "SELECT * FROM items";
  }
  const result = await db.query(sql, params);
  if (result.length === 0) {
    return null;
  }
  if (result.length === 1) {
    return result[0];
  }
  return result;
};

const insertItemRecord = async (newItem) => {
  const { name, brand } = newItem;
  const sql = "INSERT INTO items (name, brand) VALUES (?, ?)";
  const params = [name, brand];
  const result = await db.query(sql, params);
  return {
    ...newItem,
    id: result.insertId,
  };
};

const updateItemRecord = async (modifiedItem) => {
  const { id, name, brand } = modifiedItem;
  const sql = "UPDATE items SET name = ?, brand = ? WHERE id = ?";
  const params = [name, brand, id];
  const result = await db.query(sql, params);
  if (result.affectedRows === 0) {
    return null;
  }
  return modifiedItem;
};

const deleteItemRecords = async (itemIds) => {
  let sql;
  let params;
  if (Array.isArray(itemIds) || typeof itemIds === "number") {
    sql = "DELETE FROM items WHERE id IN (?)";
    params = [itemIds];
  } else {
    sql = "DELETE FROM items";
  }
  const result = await db.query(sql, params);
  return result.affectedRows;
};

module.exports = {
  selectItemRecords,
  insertItemRecord,
  updateItemRecord,
  deleteItemRecords,
};

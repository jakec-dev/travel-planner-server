const db = require("../utils/db");

const selectItemRecords = async (itemIds) => {
  let sql;
  let params;
  if (Array.isArray(itemIds)) {
    const itemIdList = itemIds.join(",");
    sql = "SELECT * FROM items WHERE id IN ?";
    params = [itemIdList];
  } else if (typeof itemIds === "number") {
    sql = "SELECT * FROM items WHERE id = ?";
    params = [itemIds];
  } else {
    sql = "SELECT * FROM items";
  }
  const result = await db.query(sql, params);
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
  if (Array.isArray(itemIds)) {
    const itemIdList = itemIds.join(",");
    sql = "DELETE FROM items WHERE id IN ?";
    params = [itemIdList];
  } else if (typeof itemIds === "number") {
    sql = "DELETE FROM items WHERE id = ?";
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

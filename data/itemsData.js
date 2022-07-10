const pool = require("../utils/dbPool");

const resolvePromise = (resolve, reject) => (err, result) => {
  if (err) {
    reject(err);
  } else {
    resolve(result);
  }
};

const selectItemRecords = (itemIds) => {
  if (Array.isArray(itemIds)) {
    const itemIdList = itemIds.join(",");
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM items WHERE id IN ?",
        [itemIdList],
        resolvePromise(resolve, reject)
      );
    });
  }
  if (typeof itemIds === "number") {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM items WHERE id = ?",
        [itemIds],
        resolvePromise(resolve, reject)
      );
    });
  }
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM items", resolvePromise(resolve, reject));
  });
};

const insertItemRecord = (newItem) => {
  const { name, brand } = newItem;
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO items (name, brand) VALUES (?, ?)",
      [name, brand],
      resolvePromise(resolve, reject)
    );
  });
};

const updateItemRecord = (modifiedItem) => {
  const { id, name, brand } = modifiedItem;
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE items SET name = ?, brand = ? WHERE id = ?",
      [name, brand, id],
      resolvePromise(resolve, reject)
    );
  });
};

const deleteItemRecords = (itemIds) => {
  if (Array.isArray(itemIds)) {
    const itemIdList = itemIds.join(",");
    return new Promise((resolve, reject) => {
      pool.query(
        "DELETE FROM items WHERE id in ?",
        [itemIdList],
        resolvePromise(resolve, reject)
      );
    });
  }
  if (typeof itemIds === "number") {
    return new Promise((resolve, reject) => {
      pool.query(
        "DELETE FROM items WHERE id = ?",
        [itemIds],
        resolvePromise(resolve, reject)
      );
    });
  }
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM items", resolvePromise(resolve, reject));
  });
};

module.exports = {
  insertItemRecord,
  updateItemRecord,
  selectItemRecords,
  deleteItemRecords,
};

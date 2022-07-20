const itemsData = require("../data/itemsData");

const getItems = async () => itemsData.selectItemRecords();

const createItem = async (newItem) => itemsData.insertItemRecord(newItem);

const updateItem = async (modifiedItem) =>
  itemsData.updateItemRecord(modifiedItem);

const getItemWithId = async (itemId) => {
  const result = await itemsData.selectItemRecords(itemId);
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

const deleteItemWithId = async (itemId) => {
  const result = await itemsData.deleteItemRecords(itemId);
  if (result === 0) {
    return null;
  }
  return itemId;
};

module.exports = {
  createItem,
  updateItem,
  getItems,
  getItemWithId,
  deleteItemWithId,
};

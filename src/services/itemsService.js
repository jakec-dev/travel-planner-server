const itemsData = require("../data/itemsData");

const getItems = async () => itemsData.selectItemRecords();

const createItem = async (newItem) => itemsData.insertItemRecord(newItem);

const updateItem = async (modifiedItem) =>
  itemsData.updateItemRecord(modifiedItem);

const getItemWithId = async (itemId) => itemsData.selectItemRecords(itemId);

const deleteItemWithId = async (itemId) => itemsData.deleteItemRecords(itemId);

module.exports = {
  createItem,
  updateItem,
  getItems,
  getItemWithId,
  deleteItemWithId,
};

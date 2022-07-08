const { getItemRecords } = require("../data/itemsData");

const getItemWithId = async (itemId) => {
  const result = await getItemRecords(itemId);
  return result[0];
};

const getItems = async () => {
  const result = await getItemRecords();
  return result;
};

module.exports = { getItems, getItemWithId };

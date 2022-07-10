const {
  insertItemRecord,
  updateItemRecord,
  selectItemRecords,
  deleteItemRecords,
} = require("../data/itemsData");

const createItem = async (newItem) => {
  try {
    const result = await insertItemRecord(newItem);
    return {
      status: "success",
      data: result,
    };
  } catch (err) {
    return {
      status: "error",
      errorMessage: err,
    };
  }
};

const updateItem = async (modifiedItem) => {
  try {
    const result = await updateItemRecord(modifiedItem);
    return {
      status: "success",
      data: result,
    };
  } catch (err) {
    return {
      status: "error",
      errorMessage: err,
    };
  }
};

updateItem({ id: 2, name: "modified name", brand: "modified brand" }).then(
  (resp) => {
    console.log(resp);
  }
);

const getItems = async () => {
  const result = await selectItemRecords();
  return result;
};

const getItemWithId = async (itemId) => {
  const result = await selectItemRecords(itemId);
  return result[0];
};

const deleteItemWithId = async (itemId) => {
  try {
    const result = await deleteItemRecords(itemId);
    if (result.affectedRows === 0) {
      return {
        status: "error",
        errorMessage: `No items with ID ${itemId} exist`,
      };
    }
    return {
      status: "success",
    };
  } catch (err) {
    return {
      status: "error",
      errorMessage: err,
    };
  }
};

module.exports = {
  createItem,
  updateItem,
  getItems,
  getItemWithId,
  deleteItemWithId,
};

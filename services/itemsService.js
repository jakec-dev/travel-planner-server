const {
  insertItemRecord,
  updateItemRecord,
  selectItemRecords,
  deleteItemRecords,
} = require("../data/itemsData");

const getItems = async () => {
  try {
    const result = await selectItemRecords();
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

const getItemWithId = async (itemId) => {
  try {
    const result = await selectItemRecords(itemId);
    if (result.length === 0) {
      return {
        status: "error",
        errorMessage: `No items found with ID ${itemId}`,
      };
    }
    return {
      status: "success",
      data: result[0],
    };
  } catch (err) {
    return {
      status: "error",
      errorMessage: err,
    };
  }
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

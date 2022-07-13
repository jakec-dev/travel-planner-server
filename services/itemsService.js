const itemsData = require("../data/itemsData");

const getItems = async () => {
  try {
    const result = await itemsData.selectItemRecords();
    return {
      status: "success",
      data: result,
    };
  } catch (err) {
    return {
      status: "error",
      errorType: 400,
      errorMessage: err.message,
    };
  }
};

const createItem = async (newItem) => {
  try {
    const result = await itemsData.insertItemRecord(newItem);
    return {
      status: "success",
      data: result,
    };
  } catch (err) {
    return {
      status: "error",
      errorType: 400,
      errorMessage: err.message,
    };
  }
};

const updateItem = async (modifiedItem) => {
  try {
    const result = await itemsData.updateItemRecord(modifiedItem);
    if (result.affectedRows === 0) {
      return {
        status: "error",
        errorType: 404,
        errorMessage: `No item with ID ${modifiedItem.id} exists`,
      };
    }
    return {
      status: "success",
      data: modifiedItem,
    };
  } catch (err) {
    return {
      status: "error",
      errorType: 400,
      errorMessage: err.message,
    };
  }
};

const getItemWithId = async (itemId) => {
  try {
    const result = await itemsData.selectItemRecords(itemId);
    if (result.length === 0) {
      return {
        status: "error",
        errorType: 404,
        errorMessage: `No item with ID ${itemId} exists`,
      };
    }
    return {
      status: "success",
      data: result[0],
    };
  } catch (err) {
    return {
      status: "error",
      errorType: 400,
      errorMessage: err.message,
    };
  }
};

const deleteItemWithId = async (itemId) => {
  try {
    const result = await itemsData.deleteItemRecords(itemId);
    if (result.affectedRows === 0) {
      return {
        status: "error",
        errorType: 404,
        errorMessage: `No item with ID ${itemId} exists`,
      };
    }
    return {
      status: "success",
      data: itemId,
    };
  } catch (err) {
    return {
      status: "error",
      errorType: 400,
      errorMessage: err.message,
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

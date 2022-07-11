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
    if (result.affectedRows === 0) {
      return {
        status: "error",
        errorMessage: `No item with ID ${modifiedItem.id} exists`,
      };
    }
    if (result.changedRows === 0) {
      return {
        status: "success",
        data: modifiedItem,
        warningMessage: "Modified item is the same as the original item",
      };
    }
    return {
      status: "success",
      data: modifiedItem,
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

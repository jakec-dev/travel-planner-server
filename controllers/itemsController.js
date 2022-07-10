const {
  createItem,
  getItems,
  updateItem,
  getItemWithId,
  deleteItemWithId,
} = require("../services/itemsService");

const get = (_req, res) => {
  const items = getItems();
  res.json({
    status: "success",
    message: "Items fetched successfully",
    data: items,
  });
};

const post = (req, res) => {
  const newItem = req.body;
  const result = createItem(newItem);
  if (result.status === "error") {
    res.json({
      status: "error",
      message: result.errorMessage,
    });
  } else {
    res.json({
      status: "success",
      message: "Item added successfully",
      data: { ...newItem, id: result.insertId },
    });
  }
};

const put = (req, res) => {
  const modifiedItem = req.body;
  const result = updateItem(modifiedItem);
  if (result.status === "error") {
    res.json({
      status: "error",
      message: result.errorMessage,
    });
  } else {
    res.json({
      status: "success",
      message: "Item updated successfully",
      data: modifiedItem,
    });
  }
};

const getWithId = (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = getItemWithId(itemId);
  if (!item) {
    res.json({
      status: "error",
      message: `No item found with id=${itemId}`,
    });
  } else {
    res.json({
      status: "success",
      message: "Item fetched successfully",
      data: item,
    });
  }
};

const deleteWithId = (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const result = deleteItemWithId(itemId);
  if (result.status === "error") {
    res.json({
      status: "error",
      message: result.errorMessage,
    });
  } else {
    res.json({
      status: "success",
      message: "Item deleted successfully",
      data: itemId,
    });
  }
};

module.exports = {
  get,
  post,
  put,
  getWithId,
  deleteWithId,
};

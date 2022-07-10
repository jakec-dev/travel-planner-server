const {
  createItem,
  getItems,
  updateItem,
  getItemWithId,
  deleteItemWithId,
} = require("../services/itemsService");

const get = (_req, res) => {
  const result = getItems();
  if (result.status === "error") {
    res.json({
      status: "error",
      message: result.errorMessage,
    });
  } else {
    res.json({
      status: "success",
      message: "Items fetched successfully",
      data: result.data,
    });
  }
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
  const result = getItemWithId(itemId);
  if (result.status === "error") {
    res.json({
      status: "error",
      message: result.errorMessage,
    });
  } else {
    res.json({
      status: "success",
      message: "Item fetched successfully",
      data: result.data,
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

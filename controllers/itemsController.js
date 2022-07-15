const itemsService = require("../services/itemsService");

const get = async (_req, res) => {
  const result = await itemsService.getItems();
  if (result.status === "error") {
    res.status(result.errorType).json({
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

const post = async (req, res) => {
  const newItem = req.body;
  const result = await itemsService.createItem(newItem);
  if (result.status === "error") {
    res.status(result.errorType).json({
      status: "error",
      message: result.errorMessage,
    });
  } else {
    res.json({
      status: "success",
      message: "Item added successfully",
      data: result.data,
    });
  }
};

const put = async (req, res) => {
  const modifiedItem = req.body;
  const result = await itemsService.updateItem(modifiedItem);
  if (result.status === "error") {
    res.status(result.errorType).json({
      status: "error",
      message: result.errorMessage,
    });
  } else {
    res.json({
      status: "success",
      message: "Item updated successfully",
      data: result.data,
    });
  }
};

const getWithId = async (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  if (Number.isNaN(itemId)) {
    res.status(422).json({
      status: "error",
      message: "Item ID is not a number",
    });
  } else {
    const result = await itemsService.getItemWithId(itemId);
    if (result.status === "error") {
      res.status(result.errorType).json({
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
  }
};

const deleteWithId = async (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  if (Number.isNaN(itemId)) {
    res.status(422).json({
      status: "error",
      message: "Item ID is not a number",
    });
  } else {
    const result = await itemsService.deleteItemWithId(itemId);
    if (result.status === "error") {
      res.status(result.errorType).json({
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
  }
};

module.exports = {
  get,
  post,
  put,
  getWithId,
  deleteWithId,
};

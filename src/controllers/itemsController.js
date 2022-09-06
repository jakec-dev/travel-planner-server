const itemsService = require("../services/itemsService");

const get = async (_req, res) => {
  try {
    const result = await itemsService.getItems();
    res.json({
      status: "success",
      message: "Items fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

const post = async (req, res) => {
  try {
    const newItem = req.body;
    const result = await itemsService.createItem(newItem);
    res.json({
      status: "success",
      message: "Item added successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

const put = async (req, res) => {
  try {
    const modifiedItem = req.body; // convert "" to undefined here?
    const result = await itemsService.updateItem(modifiedItem);
    if (!result) {
      res.status(404).json({
        status: "error",
        message: `No item with ID ${modifiedItem.id} exists`,
      });
    } else {
      res.json({
        status: "success",
        message: "Item updated successfully",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

const getWithId = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    if (Number.isNaN(itemId)) {
      res.status(422).json({
        status: "error",
        message: "Item ID is not a number",
      });
    } else {
      const result = await itemsService.getItemWithId(itemId);
      if (!result) {
        res.status(404).json({
          status: "error",
          message: `No item with ID ${itemId} exists`,
        });
      } else {
        res.json({
          status: "success",
          message: "Item fetched successfully",
          data: result,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteWithId = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    if (Number.isNaN(itemId)) {
      res.status(422).json({
        status: "error",
        message: "Item ID is not a number",
      });
    } else {
      const result = await itemsService.deleteItemWithId(itemId);
      if (!result) {
        res.status(404).json({
          status: "error",
          message: `No item with ID ${itemId} exists`,
        });
      } else {
        res.json({
          status: "success",
          message: "Item deleted successfully",
          data: itemId,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
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

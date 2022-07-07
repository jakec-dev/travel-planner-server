const { dbReadItem, dbReadItems } = require("../Services/dbItemsOps");

const hardcodedItems = [
  { id: 1, name: "Backpack", brand: "Osprey" },
  { id: 2, name: "Shoes", brand: "Nike" },
  { id: 3, name: "Toothpaste", brand: "Colgate" },
];

const addItem = (req, res) => {
  res.json({
    status: "success",
    message: "Item created successfully",
    data: req.body,
  });
};

const deleteItem = (req, res) => {
  const updatedItems = hardcodedItems.filter(
    (item) => item.id !== parseInt(req.params.id, 10)
  );
  res.json({
    status: "success",
    message: "Item deleted successfully",
    data: updatedItems,
  });
};

const getItem = (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = dbReadItem(itemId);
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

const getItems = (_req, res) => {
  const items = dbReadItems();
  res.json({
    status: "success",
    message: "Items fetched successfully",
    data: items,
  });
};

const updateItem = (req, res) => {
  const updatedItems = hardcodedItems.map((item) =>
    item.id === req.body.id ? req.body : item
  );
  res.json({
    status: "success",
    message: "Item updated successfully",
    data: updatedItems,
  });
};

module.exports = {
  addItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
};

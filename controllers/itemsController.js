const { getItems, getItemWithId } = require("../data/itemsData");

const hardcodedItems = [
  { id: 1, name: "Backpack", brand: "Osprey" },
  { id: 2, name: "Shoes", brand: "Nike" },
  { id: 3, name: "Toothpaste", brand: "Colgate" },
];

const get = (_req, res) => {
  const items = getItems();
  res.json({
    status: "success",
    message: "Items fetched successfully",
    data: items,
  });
};

const post = (req, res) => {
  res.json({
    status: "success",
    message: "Item created successfully",
    data: req.body,
  });
};

const put = (req, res) => {
  const updatedItems = hardcodedItems.map((item) =>
    item.id === req.body.id ? req.body : item
  );
  res.json({
    status: "success",
    message: "Item updated successfully",
    data: updatedItems,
  });
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
  const updatedItems = hardcodedItems.filter(
    (item) => item.id !== parseInt(req.params.id, 10)
  );
  res.json({
    status: "success",
    message: "Item deleted successfully",
    data: updatedItems,
  });
};

module.exports = {
  get,
  post,
  put,
  getWithId,
  deleteWithId,
};

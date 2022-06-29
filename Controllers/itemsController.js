const items = [
  { id: 1, name: "Backpack", brand: "Osprey" },
  { id: 2, name: "Shoes", brand: "Nike" },
  { id: 3, name: "Toothpaste", brand: "Colgate" },
];

const findItem = (itemId) => items.find((item) => item.id === itemId);

const addItem = (req, res) => {
  const existingItem = findItem(req.body.id);
  if (existingItem) {
    res.json({
      status: "error",
      message: `Item with ID ${req.body.id} already exists`,
    });
  } else {
    res.json({
      status: "success",
      message: "Item created successfully",
      data: req.body,
    });
  }
};

const deleteItem = (req, res) => {
  const existingItem = findItem(parseInt(req.params.id, 10));
  if (!existingItem) {
    res.json({
      status: "error",
      message: `No item with ID ${req.params.id} exists`,
    });
  } else {
    res.json({
      status: "success",
      message: "Item deleted successfully",
      data: existingItem,
    });
  }
};

const getItem = (req, res) => {
  const fetchedItem = findItem(parseInt(req.params.id, 10));
  if (!fetchedItem) {
    res.json({
      status: "error",
      message: `No item found with id=${req.params.id}`,
    });
  } else {
    res.json({
      status: "success",
      message: "Item fetched successfully",
      data: fetchedItem,
    });
  }
};

const getItems = (_req, res) => {
  res.json({
    status: "success",
    message: "Items fetched successfully",
    data: items,
  });
};

const updateItem = (req, res) => {
  const existingItem = findItem(req.body.id);
  if (!existingItem) {
    res.json({
      status: "error",
      message: `No item with ID ${req.body.id} exists`,
    });
  } else {
    res.json({
      status: "success",
      message: "Item updated successfully",
      data: req.body,
    });
  }
};

module.exports = {
  addItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
};

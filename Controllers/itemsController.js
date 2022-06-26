const items = [
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
  const updatedItems = items.filter((item) => item.id !== req.body);
  res.json({
    status: "success",
    message: "Item deleted successfully",
    data: updatedItems,
  });
};

const getItem = (req, res) => {
  const fetchedItem = items.find((item) => item.id === req.body);
  res.json({
    status: "success",
    message: "Item fetched successfully",
    data: fetchedItem,
  });
};

const getItems = (req, res) => {
  res.json({
    status: "success",
    message: "Items fetched successfully",
    data: items,
  });
};

const updateItem = (req, res) => {
  const updatedItems = items.map((item) =>
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

const items = [
  { id: 1, name: "Backpack", brand: "Osprey" },
  { id: 2, name: "Shoes", brand: "Nike" },
  { id: 3, name: "Toothpaste", brand: "Colgate" },
];

const addItem = (req, res) => {
  res.send(req.body);
};

const deleteItem = (req, res) => {
  const updatedItems = items.filter(
    (i) => i.id !== parseInt(req.params.id, 10)
  );
  res.json(updatedItems);
};

const getItem = (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  res.json(item);
};

const getItems = (req, res) => {
  res.json(items);
};

const updateItem = (req, res) => {
  const updatedItems = items.map((item) =>
    item.id === req.body.id ? req.body : item
  );
  res.json(updatedItems);
};

module.exports = {
  addItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
};

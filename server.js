const express = require("express");
const cors = require("cors");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

// TEMPORARY HARD-CODE VALUES
const items = [
  { id: 1, name: "Backpack", brand: "Osprey" },
  { id: 2, name: "Shoes", brand: "Nike" },
  { id: 3, name: "Toothpaste", brand: "Colgate" },
];

app.get("/items", (req, res) => {
  // SELECT * FROM items
  res.json(items);
});

app.get("/item/:id", (req, res) => {
  // SELECT * FROM items WHERE id=req.itemId
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  // Return new item
  res.json(item);
});

app.post("/item", (req, res) => {
  // Save req.body to database
  // Return new item
  res.send(req.body);
});

app.put("/item", (req, res) => {
  const updatedItems = items.map((item) =>
    item.id === req.body.id ? req.body : item
  );
  res.json(updatedItems);
});

app.delete("/item/:id", (req, res) => {
  const tempItems = [
    { id: 1, name: "Backpack", brand: "Osprey" },
    { id: 2, name: "Shoes", brand: "Nike" },
    { id: 3, name: "Toothpaste", brand: "Colgate" },
  ];
  const updatedItems = tempItems.filter(
    (i) => i.id !== parseInt(req.params.id, 10)
  );
  // Return all items for now
  res.json(updatedItems);
});

const server = app.listen(app.get("port"), () => {
  // eslint-disable-next-line no-console
  console.log("listening on port ", server.address().port);
});

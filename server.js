const express = require("express");
const cors = require("cors");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Travel Planner Backend Server");
});

app.get("/items", (req, res) => {
  // SELECT * FROM items
  const items = [
    { id: 1, name: "Backpack", brand: "Osprey" },
    { id: 2, name: "Shoes", brand: "Nike" },
    { id: 3, name: "Toothpaste", brand: "Colgate" },
  ];
  res.json({ items });
});

app.post("/item", (req, res) => {
  // Save req.body to database
  // Return new item
  res.send(req.body);
});

const server = app.listen(app.get("port"), () => {
  // eslint-disable-next-line no-console
  console.log("listening on port ", server.address().port);
});

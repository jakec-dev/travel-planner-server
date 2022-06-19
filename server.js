const express = require("express");
const cors = require("cors");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Travel Planner Backend Server");
});

app.get("/items/get", (req, res) => {
  res.json({
    items: [
      { id: 1, name: "Backpack", brand: "Osprey" },
      { id: 2, name: "Shoes", brand: "Nike" },
      { id: 3, name: "Toothpaste", brand: "Colgate" },
    ],
  });
});

const server = app.listen(app.get("port"), () => {
  console.log("listening on port ", server.address().port);
});

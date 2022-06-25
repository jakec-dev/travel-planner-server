const express = require("express");
const cors = require("cors");
const itemsRoutes = require("./Routes/itemsRoutes");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.use("/items", itemsRoutes);

const server = app.listen(app.get("port"), () => {
  // eslint-disable-next-line no-console
  console.log("listening on port ", server.address().port);
});

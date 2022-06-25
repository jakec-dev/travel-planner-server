const express = require("express");
const itemsController = require("../Controllers/itemsController");

const router = express.Router();

router.post("/", itemsController.addItem);
router.get("/", itemsController.getItems);
router.put("/", itemsController.updateItem);

router.delete("/:id", itemsController.deleteItem);
router.get("/:id", itemsController.getItem);

module.exports = router;

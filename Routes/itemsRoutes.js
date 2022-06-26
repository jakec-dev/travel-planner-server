const express = require("express");
const itemsController = require("../Controllers/itemsController");
const Validator = require("../Middlewares/ValidatorMiddleware");

const router = express.Router();

router.get("/", itemsController.getItems);
router.post("/", Validator("item"), itemsController.addItem);
router.put("/", Validator("item"), itemsController.updateItem);

router.get("/:id", Validator("itemId"), itemsController.getItem);
router.delete("/:id", Validator("itemId"), itemsController.deleteItem);

module.exports = router;

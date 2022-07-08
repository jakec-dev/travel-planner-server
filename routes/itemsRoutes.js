const express = require("express");
const itemsController = require("../controllers/itemsController");
const Validator = require("../middlewares/ValidatorMiddleware");

const router = express.Router();

router.get("/", itemsController.get);
router.post("/", Validator("item"), itemsController.post);
router.put("/", Validator("item"), itemsController.put);

router.get("/:id", itemsController.getWithId);
router.delete("/:id", itemsController.deleteWithId);

module.exports = router;

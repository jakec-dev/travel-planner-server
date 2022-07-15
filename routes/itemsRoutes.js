const express = require("express");
const itemsController = require("../controllers/itemsController");
const Validator = require("../middlewares/ValidatorMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         name:
 *           type: string
 *           description: name of the item
 *         brand:
 *           type: string
 *           descripton: brand of the item
 *       example:
 *         id: 1
 *         name: Backpack
 *         brand: Osprey
 *
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Returns all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: the list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/", itemsController.get);
router.post("/", Validator("newItem"), itemsController.post);
router.put("/", Validator("existingItem"), itemsController.put);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Returns item by ID
 *     tags: [Items]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of item
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: items by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: item can not be found
 */
router.get("/:id", itemsController.getWithId);
router.delete("/:id", itemsController.deleteWithId);

module.exports = router;

const express = require("express");
const itemsController = require("../controllers/itemsController");
const Validator = require("../middlewares/ValidatorMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       required:
 *         - status
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the response
 *         message:
 *           type: string
 *           description: Description of the response
 *     ExistingItem:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated ID for an item
 *         name:
 *           type: string
 *           description: Name of the item
 *         brand:
 *           type: string
 *           descripton: Brand of the item
 *         weight:
 *           type: number
 *           descripton: Weight of the item in grams
 *         url:
 *           type: string
 *           descripton: URL to the item's listing online
 *         price:
 *           type: number
 *           descripton: Price of the item
 *         notes:
 *           type: string
 *           descripton: Additional notes about the item
 *       example:
 *         id: 1
 *         name: Backpack
 *         brand: Osprey
 *         weight: 920
 *         url: https://www.osprey.com/backpack
 *         price: 249.95
 *         notes: 2022 model in black
 *     NewItem:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the item
 *         brand:
 *           type: string
 *           descripton: Brand of the item
 *         weight:
 *           type: number
 *           descripton: Weight of the item in grams
 *         url:
 *           type: string
 *           descripton: URL to the item's listing online
 *         price:
 *           type: number
 *           descripton: Price of the item
 *         notes:
 *           type: string
 *           descripton: Additional notes about the item
 *       example:
 *         name: Backpack
 *         brand: Osprey
 *         weight: 920
 *         url: https://www.osprey.com/backpack
 *         price: 249.95
 *         notes: 2022 model in black
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Returns all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of all items
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Response'
 *                 - type: object
 *                   required:
 *                     - data
 *                   properties:
 *                     data:
 *                       type: array
 *                       description: Data returned on success
 *                       items:
 *                         $ref: '#/components/schemas/ExistingItem'
 *               example:
 *                 status: success
 *                 message: Items fetched successfully
 *                 data:
 *                   - id: 1
 *                     name: Backpack
 *                     brand: Osprey
 *                     weight: 920
 *                     url: https://www.osprey.com/backpack
 *                     price: 249.95
 *                     notes: 2022 model in black
 *                   - id: 2
 *                     name: Shoes
 *                     brand: Nike
 *                     weight: 540
 *                     url: https://www.nike.com/shoes
 *                     price: 200
 *                     notes: 2020 model in blue/white
 */
router.get("/", itemsController.get);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Creates a new item
 *     tags: [Items]
 *     requestBody:
 *       description: New item object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewItem'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Response'
 *                 - type: object
 *                   required:
 *                     - data
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/NewItem'
 *               example:
 *                 status: success
 *                 message: Item created successfully
 *                 data:
 *                   id: 3
 *                   name: Backpack
 *                   brand: Osprey
 *                   weight: 920
 *                   url: https://www.osprey.com/backpack
 *                   price: 249.95
 *                   notes: 2022 model in black
 *       422:
 *         description: Item is missing required properties
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example:
 *               status: error
 *               message: Invalid request data
 *               data:
 *                 brand: Osprey
 *                 weight: 920
 *                 price: 249.95
 */
router.post("/", Validator("newItem"), itemsController.post);

/**
 * @swagger
 * /items:
 *   put:
 *     summary: Updates an existing item
 *     tags: [Items]
 *     requestBody:
 *       description: Modified item object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExistingItem'
 *           example:
 *             id: 3
 *             name: Backpack
 *             brand: Tom Binh
 *             weight: 850
 *             url: https://www.tombinh.com/backpack
 *             price: 249.99
 *             notes: 2022 model in forest green
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Response'
 *                 - type: object
 *                   required:
 *                     - data
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ExistingItem'
 *               example:
 *                 status: success
 *                 message: Items updated successfully
 *                 data:
 *                   id: 3
 *                   name: Backpack
 *                   brand: Tom Binh
 *                   weight: 850
 *                   url: https://www.tombinh.com/backpack
 *                   price: 249.99
 *                   notes: 2022 model in forest green
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example:
 *               status: error
 *               message: No item with ID 3 exists
 *       422:
 *         description: Item is missing required properties
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example:
 *               status: error
 *               message: Invalid request data
 *               data:
 *                 brand: Osprey
 */
router.put("/", Validator("existingItem"), itemsController.put);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Returns item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of requested item
 *         schema:
 *           type: integer
 *           example: 3
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Response'
 *                 - type: object
 *                   required:
 *                     - data
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ExistingItem'
 *               example:
 *                 status: success
 *                 message: Items fetched successfully
 *                 data:
 *                   id: 3
 *                   name: Backpack
 *                   brand: Tom Binh
 *                   weight: 850
 *                   url: https://www.tombinh.com/backpack
 *                   price: 249.99
 *                   notes: 2022 model in forest green
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example:
 *               status: error
 *               message: No item with ID 3 exists
 *       422:
 *         description: Invalid item ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example:
 *               status: error
 *               message: Item ID is not a number
 */
router.get("/:id", itemsController.getWithId);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deletes item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of item to be deleted
 *         schema:
 *           type: integer
 *           example: 3
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Response'
 *                 - type: object
 *                   required:
 *                     - data
 *                   properties:
 *                     data:
 *                       type: integer
 *                       description: ID of deleted item
 *               example:
 *                 status: success
 *                 message: Items deleted successfully
 *                 data: 3
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example:
 *               status: error
 *               message: No item with ID 3 exists
 *       422:
 *         description: Invalid item ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *             example:
 *               status: error
 *               message: Item ID is not a number
 */
router.delete("/:id", itemsController.deleteWithId);

module.exports = router;

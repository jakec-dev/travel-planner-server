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
 *           description: The Auto-generated id of a post
 *         name:
 *           type: string
 *           description: Name of the item
 *         brand:
 *           type: string
 *           descripton: Brand of the item
 *       example:
 *         id: 1
 *         name: Backpack
 *         brand: Osprey
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
 *       example:
 *         name: Backpack
 *         brand: Osprey
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
 *                   - id: 2
 *                     name: Shoes
 *                     brand: Nike
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
 *                 message: Items added successfully
 *                 data:
 *                   id: 3
 *                   name: Backpack
 *                   brand: Osprey
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
 *       404:
 *         description: An item with the specified ID was not found.
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
 *         description: An item with the specified ID was not found.
 */
router.delete("/:id", itemsController.deleteWithId);

module.exports = router;

const Joi = require("joi");

const itemIdSchema = Joi.number().required();

module.exports = itemIdSchema;

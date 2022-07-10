const Joi = require("joi");

const existingItemSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  brand: Joi.string(),
});

const newItemSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string(),
});

module.exports = { newItemSchema, existingItemSchema };

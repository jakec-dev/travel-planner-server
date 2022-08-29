const Joi = require("joi");

const existingItemSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  brand: Joi.string(),
  weight: Joi.number(),
  url: Joi.string(),
  price: Joi.number(),
  notes: Joi.string(),
});

const newItemSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string(),
  weight: Joi.number(),
  url: Joi.string(),
  price: Joi.number(),
  notes: Joi.string(),
});

module.exports = { newItemSchema, existingItemSchema };

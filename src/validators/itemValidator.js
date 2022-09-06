const Joi = require("joi");

const existingItemSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  brand: Joi.string().empty("").default(null),
  weight: Joi.number().empty("").default(null),
  url: Joi.string().empty("").default(null),
  price: Joi.number().empty("").default(null),
  notes: Joi.string().empty("").default(null),
});

const newItemSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().empty("").default(null),
  weight: Joi.number().empty("").default(null),
  url: Joi.string().empty("").default(null),
  price: Joi.number().empty("").default(null),
  notes: Joi.string().empty("").default(null),
});

module.exports = { newItemSchema, existingItemSchema };

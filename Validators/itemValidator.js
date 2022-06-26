const Joi = require("joi");

const itemSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  brand: Joi.string(),
});

module.exports = itemSchema;

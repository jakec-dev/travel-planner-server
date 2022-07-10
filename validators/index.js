const { existingItemSchema, newItemSchema } = require("./itemValidator");

module.exports = {
  existingItem: existingItemSchema,
  newItem: newItemSchema,
};

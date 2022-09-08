const itemsService = require("../services/itemsService");

const resolvers = {
  Query: {
    item: async (_, { id }) => {
      const itemId = parseInt(id, 10);
      try {
        if (Number.isNaN(itemId)) {
          return {
            status: "error",
            message: "Item ID is not a number",
          };
        }
        const result = await itemsService.getItemWithId(itemId);
        if (!result) {
          return {
            status: "error",
            message: `No item with ID ${itemId} exists`,
          };
        }
        return {
          status: "success",
          message: "Item fetched successfully",
          data: result,
        };
      } catch (err) {
        return {
          status: "error",
          message: err.message,
        };
      }
    },

    items: async () => {
      try {
        const result = await itemsService.getItems();
        return {
          status: "success",
          message: "Items fetched successfully",
          data: result,
        };
      } catch (err) {
        return {
          status: "error",
          message: err.message,
        };
      }
    },
  },

  Mutation: {
    addItem: async (_, { newItem }) => {
      try {
        const result = await itemsService.createItem(newItem);
        return {
          status: "success",
          message: "Item added successfully",
          data: result,
        };
      } catch (err) {
        return {
          status: "error",
          message: err.message,
        };
      }
    },

    updateItem: async (_, { modifiedItem }) => {
      try {
        const result = await itemsService.updateItem(modifiedItem);
        if (!result) {
          return {
            status: "error",
            message: `No item with ID ${modifiedItem.id} exists`,
          };
        }
        return {
          status: "success",
          message: "Item updated successfully",
          data: result,
        };
      } catch (err) {
        return {
          status: "error",
          message: err.message,
        };
      }
    },

    deleteItem: async (_, { itemId }) => {
      const id = parseInt(itemId, 10);
      try {
        if (Number.isNaN(id)) {
          return {
            status: "error",
            message: "Item ID is not a number",
          };
        }
        const result = await itemsService.deleteItemWithId(id);
        if (!result) {
          return {
            status: "error",
            message: `No item with ID ${id} exists`,
          };
        }
        return {
          status: "success",
          message: "Item deleted successfully",
          data: id,
        };
      } catch (err) {
        return {
          status: "error",
          message: err.message,
        };
      }
    },
  },
};

module.exports = resolvers;

const itemsService = require("../services/itemsService");

const resolvers = {
  Query: {
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
};

module.exports = resolvers;

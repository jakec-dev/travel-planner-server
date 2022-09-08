const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
// const db = require("./utils/db");
const itemsRoutes = require("./routes/itemsRoutes");
const apiDocsRoutes = require("./routes/apiDocsRoutes");

const server = new ApolloServer({ typeDefs, resolvers });

const main = async () => {
  const app = express();
  const port = process.env.PORT || 5000;
  app.set("port", port);
  app.use(cors());
  app.use(express.json());
  app.use("/items", itemsRoutes);
  app.use("/api-docs", apiDocsRoutes);

  await server.start();
  server.applyMiddleware({ app });

  app.listen(app.get("port"), () => {
    // eslint-disable-next-line no-console
    console.log(
      `Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

main();

// server.on("close", () => {
//   db.disconnect();
// });

module.exports = server;

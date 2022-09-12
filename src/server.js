/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const db = require("./utils/db");
const itemsRoutes = require("./routes/itemsRoutes");
const apiDocsRoutes = require("./routes/apiDocsRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/items", itemsRoutes);
app.use("/api-docs", apiDocsRoutes);

const httpServer = http.createServer(app);

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });

  await httpServer.listen({ port: PORT });
  httpServer.on("close", () => {
    db.disconnect();
  });

  console.log("Server ready at:");
  console.log(`GraphQL: http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`REST: http://localhost:${PORT}/api-docs`);
};

startApolloServer();

module.exports = httpServer;

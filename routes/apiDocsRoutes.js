const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Planner",
      version: "1.0.0",
      description: "Backend server for Travel Planner app",
      contact: {
        name: "Jake Clayton",
        url: "https://github.com/jakec-dev/travel-planner-server",
        email: "jake@jakec.dev",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development",
      },
    ],
  },
  apis: ["./routes/itemsRoutes.js"],
};

const swaggerSpec = swaggerJsDoc(options);

const router = express.Router();

router.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true, defaultModelsExpandDepth: -1 })
);

module.exports = router;

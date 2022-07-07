const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  version: "1.0.0",
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

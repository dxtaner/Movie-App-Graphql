const express = require("express");
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const cron = require("./cron");
const connectToDatabase = require("./helpers/db.js");

const app = express();

app.use(cors());
require("dotenv").config();

const db = connectToDatabase();

cron.init();

const PORT = process.env.PORT || 5000;

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

module.exports = db;

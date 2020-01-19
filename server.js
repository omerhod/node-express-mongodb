const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const conenctDB = require("./config/db");
const colors = require("colors");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
// @ uncomment this once you add a valid MONGO_URI value to the config.env file
// conenctDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const { PORT = 8000 } = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.name}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

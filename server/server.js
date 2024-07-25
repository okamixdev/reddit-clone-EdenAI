// -----------------------------------------------------------------
// IMPORTS
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

// -----------------------------------------------------------------
// LOGGING that the server started.
console.log("//- Starting the server -//");

// Import the connection file
const connection = require("./connection/connect.js");
// Starts the DB connection.
connection();

// -----------------------------------------------------------------
// Configure the express server
const app = express();
// Configure the PORT.
const PORT = process.env.PORT || 3001;

// CORS Configuration
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

// Parse the request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use(routes);

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build/")));
}

// Serve up static assets (usually on heroku)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/"));
});

// -----------------------------------------------------------------
app.listen(PORT, (req, res) => {
  console.log(
    `Server listening on PORT: ${PORT} and runnig on http://localhost:${PORT}`
  );
});

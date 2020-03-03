const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

/**
 * Start the app on port 4000
 */
app.listen(PORT, () => {
  console.log("Server running on PORT: ", PORT);
});

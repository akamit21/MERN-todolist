const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({
  description: {
    type: String
  },
  priority: {
    type: String
  },
  is_completed: {
    type: Boolean
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model("Todo", Todo);

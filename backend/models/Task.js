const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "1",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);

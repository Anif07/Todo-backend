const mongoose = require("mongoose");

const todosschema = mongoose.Schema({
  userId: {},
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const todos = mongoose.model("todos", todosschema);

module.exports = todos;

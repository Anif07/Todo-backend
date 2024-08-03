const express = require("express");
const todos = require("../models/todos");

const mongoose = require("mongoose");
const app = express();

app.use(express.json());
const cors = require("cors");
app.use(cors());

async function handleGetAllTodos(req, res) {
  const userId = req.user.id;
  const list = await todos.find({ userId });
  res.status(200).json(list);
}
async function handlePostTodo(req, res) {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).send({ error: "Title is required" });
  }

  const userId = req.user.id;
  const details = new todos({
    userId,
    title,
    description,
  });
  await details.save();
  res.status(201).json(details);
}
async function handlePut(req, res) {
  const id = req.params.id;
  const { title, isCompleted } = req.body;
  const userId = req.user.id;

  const updatedTodo = await todos.findOneAndUpdate(
    { _id: id, userId },
    { title, isCompleted },
    { new: true }
  );

  if (!updatedTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json(updatedTodo);
}
async function handleDelete(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const deletedTodo = await todos.findOneAndDelete({ _id: id, userId });

  if (!deletedTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json({ message: "Todo deleted successfully" });
}

module.exports = {
  handleGetAllTodos,
  handlePostTodo,
  handlePut,
  handleDelete,
};

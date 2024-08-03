const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
app.use(cors());

const todos = require("../models/todos");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  handleGetAllTodos,
  handlePostTodo,
  handlePut,
  handleDelete,
} = require("../controller/todos");

router
  .route("/")
  .get(authMiddleware, handleGetAllTodos)
  .post(authMiddleware, handlePostTodo);

router
  .route("/:id")
  .put(authMiddleware, handlePut)
  .delete(authMiddleware, handleDelete);

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const { connectMongoDB } = require("./connection");
const app = express();
const userRouter = require("./routes/auth");
const todoRouter = require("./routes/todos");

const cors = require("cors");
app.use(cors());

connectMongoDB(
  "mongodb+srv://mahammadanif22:i49GaybiQVNPYrWy@node.yyq3uaq.mongodb.net/?retryWrites=true&w=majority&appName=node"
)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    "mongo connection error", err;
  });

app.use(express.json());

app.use("/", userRouter);
app.use("/todos", todoRouter);

app.listen(8080, () => {
  console.log("server is listening in 8080 port");
});

const express = require("express");
const supabase = require("../supabaseclient");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const session = require("../models/session");
const app = express();
app.use(express.json());
app.use(cors());

async function handlePostUserDetails(req, res) {
  const { email, password } = req.body;

  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).send(error.message);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return res.status(400).send(error.message);

  const dbUser = await User.findOne({ email });
  if (!dbUser) return res.status(400).send("User not found");

  const isPasswordValid = await bcrypt.compare(password, dbUser.password);
  if (!isPasswordValid) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).send({ token });
}

async function handleLogout(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const { error } = await supabase.auth.api.signOut(token);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handlePostUserDetails,
  handleUserLogin,
  handleLogout,
};

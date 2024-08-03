const express = require("express");
const router = express.Router();
const {
  handlePostUserDetails,
  handleUserLogin,
  handleLogout,
} = require("../controller/auth");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

router.post("/register", handlePostUserDetails);

router.post("/login", handleUserLogin);

router.post("/logout", handleLogout);

module.exports = router;

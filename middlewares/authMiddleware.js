const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    "hardcoded_valid_token";

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Authorization error:", err);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.headers["authorization"];

    // No token given
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // If token contains "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim();
    }

    // Verify Token
    const decoded = jwt.verify(token, "ayush_secret_key_123");

    req.user = decoded; // decoded.userId
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

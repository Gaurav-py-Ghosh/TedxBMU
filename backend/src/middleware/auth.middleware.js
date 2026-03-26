const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // [DEBUG AUTH] — remove these logs in production
  console.log("[DEBUG AUTH] Incoming request:", req.method, req.originalUrl);
  console.log("[DEBUG AUTH] Auth header:", authHeader ? `${authHeader.slice(0, 20)}...` : "MISSING");

  if (!authHeader) {
    console.log("[DEBUG AUTH] ❌ No auth header — returning 401");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("[DEBUG AUTH] ❌ Token not found after 'Bearer' split — returning 401");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[DEBUG AUTH] ✅ Token verified for:", decoded.email, "| Expires:", new Date(decoded.exp * 1000).toISOString());
    req.admin = decoded;
    next();
  } catch (err) {
    console.log("[DEBUG AUTH] ❌ Token verify failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;

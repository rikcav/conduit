const jwt = require("jsonwebtoken");

module.exports = {
  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(403).json({ error: "Forbidden" });
    }
  },
};
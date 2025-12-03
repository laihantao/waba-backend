import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log('payload: ', payload)

    req.user = payload; // attach user info to request
    next(); // allow route to continue
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

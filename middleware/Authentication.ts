import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Middleware to authenticate and verify JWT token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Extract token from "Authorization" header (Bearer token)
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    // Send response if no token is provided
    res.status(403).json({ message: "Token is required" });
    return;
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      // Send response if token is invalid or expired
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }

    // Attach user data to the request object if token is valid
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

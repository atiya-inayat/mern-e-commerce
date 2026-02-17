import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, type IUser } from "../modules/user/user.model.js";

interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}

// Create a new type called AuthRequest that is just like Express Request, but with extra things.
// extends Request → copy everything from Express Request
export interface AuthRequest extends Request {
  user?: IUser | null;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // 1. Check if the header exists and starts with 'Bearer'
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // 2. Extract token
      const token = req.headers.authorization.split(" ")[1]; // “Take the Authorization header, split it by space, and extract the actual token (ignore the word ‘Bearer’).”
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET is missing from .env");
      }

      if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
      }

      // 3. Verify (Using the unknown cast to satisfy TypeScript)
      // “Verify the token and treat the returned data as a DecodedToken type.”
      const decoded = jwt.verify(token, secret) as unknown as DecodedToken;

      // 4. Find user & attach to request
      const user = await User.findById(decoded.id).select("-password"); // .select("-password") → exclude password from response (security!)

      if (!user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 5. CRITICAL FALLBACK: If there's no Bearer header, reject the request
  return res.status(401).json({ message: "Not authorized, no token" });
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as an admin" });
};

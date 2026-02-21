import express from "express";
import type { Response } from "express";

import multer from "multer";
import { storage } from "../../config/cloudinary.js"; // No .js
import { protect, admin } from "../../middleware/auth.middleware.js"; // No .js
import type { AuthRequest } from "../../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage });

// We define the route on '/' because it will be mounted at '/api/v1/upload' in app.ts
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  (req: any, res: Response) => {
    if (req.file) {
      // With Cloudinary, req.file.path is the secure URL
      res.send({
        message: "Image Uploaded",
        url: req.file.path,
      });
    } else {
      res.status(400).send({ message: "No file uploaded" });
    }
  },
);

export { router as uploadRoutes };

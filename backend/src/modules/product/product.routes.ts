import express from "express";
import {
  createProduct,
  createProductReview,
  getProductById,
  getProducts,
} from "./product.controller.js";
import { admin, protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, admin, createProduct);
router.post("/:id/reviews", protect, createProductReview);

export { router as productRoutes };

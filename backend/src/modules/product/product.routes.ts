import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
} from "./product.controller.js";
import { admin, protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, admin, createProduct);

export { router as productRoutes };

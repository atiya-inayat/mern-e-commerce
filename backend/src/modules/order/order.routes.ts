import express from "express";
import { addOrderItems, getOrderById } from "./order.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();
router.post("/", protect, addOrderItems);
// POST/api/orders/:id
router.get("/:id", protect, getOrderById);

export { router as orderRoutes };

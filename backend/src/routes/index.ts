// import all route files and combine them - ceneral route manager

import express from "express";

import userRoutes from "../modules/user/user.routes.js";
import { productRoutes } from "../modules/product/product.routes.js";
import { orderRoutes } from "../modules/order/order.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;

import type { Response } from "express";
import { Order } from "./order.model.js";

import type { AuthRequest } from "../../middleware/auth.middleware.js";

export const addOrderItems = async (req: AuthRequest, res: Response) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const createOrder = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    return res.status(201).json(createOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order." });
  }
};
export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    // .populate links the user's name and email from the User collection
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (order) {
      return res.json(order);
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error fetching order" });
  }
};

export const updateOrderToPaid = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();

      // this data comes from the payment provider (stripe)
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

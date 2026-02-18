// We need to track the shipping address, the items, the payment result, and the price breakdown.

import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: mongoose.Types.ObjectId;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };

  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

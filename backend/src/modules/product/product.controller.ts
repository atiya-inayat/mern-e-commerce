import type { Request, Response } from "express";
import { Product } from "./product.model.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server Error fetching products" });
  }
};

// @route   GET /api/v1/products/:id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Product ID" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

// Create new product
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { name, image, description, price, brand, category, countInStock } =
      req.body;

    const newProduct = await Product.create({
      name,
      price,
      user: req.user._id,
      image: image || "images/sample.jpg",
      brand,
      category,
      countInStock,
      numReviews: 0,
      description,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating product",
      error: (error as Error).message,
    });
  }
};

export const createProductReview = async (req: AuthRequest, res: Response) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user?._id.toString(),
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      name: req.user?.name,
      rating: Number(rating),
      comment,
      user: req.user?._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useParams } from "next/navigation";
import { Loader2, ArrowLeft, ShoppingCart, Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailPage() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="text-blue-600 animate-spin" size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-20 text-center text-red-500">Product not found.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 text-gray-600 transition hover:text-blue-600"
      >
        <ArrowLeft size={20} /> Back to products
      </Link>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product Image */}
        {/* Product Image */}
        <div className="relative w-full p-4 bg-white border shadow-sm h-96 rounded-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
              {product.brand}
            </span>
            <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="px-2 py-1 text-sm font-bold text-yellow-700 bg-yellow-100 rounded">
                ★ {product.rating}
              </div>
              <span className="text-sm text-gray-500">
                {product.numReviews} Reviews
              </span>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="flex flex-col gap-4 py-6 border-t border-b">
            <div className="flex items-center justify-between text-2xl font-bold">
              <span>Price:</span>
              <span className="text-blue-600">${product.price}</span>
            </div>

            <div className="flex items-center justify-between font-medium">
              <span>Status:</span>
              <span
                className={
                  product.countInStock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.countInStock > 0 ? (
                  <span className="flex items-center gap-1">
                    <Check size={18} /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <X size={18} /> Out of Stock
                  </span>
                )}
              </span>
            </div>
          </div>

          <button
            disabled={product.countInStock === 0}
            className="flex items-center justify-center w-full gap-2 py-4 text-lg font-bold text-white transition bg-black rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={22} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

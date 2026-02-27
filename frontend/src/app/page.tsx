"use client";

import ProductCard from "@/components/product/Product-Card";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/components/product/Product-Card";

export default function HomePage() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      // In our backend, we returned { products, page, pages }. Adjust if needed.
      return response.data.products || response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="text-blue-600 animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Failed to load products.</div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Latest Products</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

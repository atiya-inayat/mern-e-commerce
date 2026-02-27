import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export interface Product {
  _id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="overflow-hidden transition duration-300 bg-white border rounded-xl hover:shadow-lg group">
      <Link href={`/products/${product._id}`}>
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105 "
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold truncate hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

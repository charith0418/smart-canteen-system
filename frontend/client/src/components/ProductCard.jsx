import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null; // Safety check

  // Create a clean fallback character if there's no product image
  const firstLetter = String(product.name || product.title || "P")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl">
      
      {/* Product Image Section */}
      <div className="relative flex h-36 w-full items-center justify-center rounded-xl bg-gray-50 p-2 transition-colors group-hover:bg-gray-100/70">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name || "Product image"}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback if image URL breaks
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div 
          style={{ display: product.image ? "none" : "flex" }}
          className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-indigo-300 select-none"
        >
          {firstLetter}
        </div>
      </div>

      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold capitalize tracking-tight text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
          {product.name || product.title || "Unnamed Item"}
        </h3>
        
        <div className="mt-2 flex items-center justify-between gap-2 pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Price</span>
            <span className="text-base font-bold text-emerald-600">
              Rs. {Number(product.price).toLocaleString()}
            </span>
          </div>

          {/* Upgraded Action Button */}
          <button
            onClick={() => addToCart(product)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white shadow-md transition-all duration-200 hover:bg-indigo-600 hover:shadow-indigo-200 active:scale-95"
            title={`Add ${product.name} to cart`}
          >
            <span className="text-xl font-medium leading-none">&#43;</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
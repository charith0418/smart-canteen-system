import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { increase, decrease, removeFromCart } = useCart();
  const id = item._id || item.id;

  // Get the first letter of the product name for a clean placeholder icon
  const firstLetter = String(item.name || item.title || "P")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md">
      
      {/* Left Section: Product Avatar & Metadata info */}
      <div className="flex flex-1 items-center gap-3">
        {/* Dynamic Thumbnail Bubble */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-lg font-bold text-indigo-600 transition-colors group-hover:bg-indigo-100">
          {firstLetter}
        </div>

        {/* Text Block */}
        <div className="flex flex-col gap-0.5">
          <h4 className="text-sm font-semibold capitalize tracking-wide text-gray-800">
            {item.name || item.title || "Product"}
          </h4>
          <p className="text-xs text-gray-500">
            Rs {Number(item.price).toLocaleString()} × {item.qty} ={" "}
            <span className="font-semibold text-emerald-600">
              Rs {(Number(item.price) * item.qty).toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* Right Section: Quantity adjustment Controls & Delete action */}
      <div className="ml-3 flex flex-col items-end gap-2">
        {/* Quantity Pill Box */}
        <div className="flex items-center gap-1 rounded-full bg-gray-100 p-0.5">
          <button
            onClick={() => decrease(id)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-50 active:bg-gray-100"
            title="Decrease Quantity"
          >
            &minus;
          </button>
          
          <span className="w-6 text-center text-xs font-semibold text-gray-800">
            {item.qty}
          </span>

          <button
            onClick={() => increase(id)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-50 active:bg-gray-100"
            title="Increase Quantity"
          >
            &#43;
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(id)}
          className="text-[11px] font-medium text-gray-400 underline decoration-transparent transition-all duration-150 hover:text-red-500 hover:decoration-red-500"
        >
          Remove
        </button>
      </div>

    </div>
  );
};

export default CartItem;
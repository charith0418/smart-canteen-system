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
    /* 📱 MOBILE: p-2.5 instead of p-3 to open up horizontal text margins
       💻 PC MONITOR: hover animations and full padding structure scale cleanly
    */
    <div className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-2.5 sm:p-3 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md">
      
      {/* Left Section: Product Avatar & Metadata info */}
      <div className="flex flex-1 items-center gap-2 sm:gap-3 min-w-0">
        {/* Dynamic Thumbnail Bubble */}
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-base sm:text-lg font-bold text-indigo-600 transition-colors group-hover:bg-indigo-100 select-none">
          {firstLetter}
        </div>

        {/* Text Block - 'min-w-0' combined with 'truncate' ensures safe overflow on screens */}
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-semibold capitalize tracking-wide text-gray-800 truncate">
            {item.name || item.title || "Product"}
          </h4>
          <p className="text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">
            Rs {Number(item.price).toLocaleString()} × {item.qty} ={" "}
            <span className="font-semibold text-emerald-600">
              Rs {(Number(item.price) * item.qty).toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* Right Section: Quantity adjustment Controls & Delete action */}
      <div className="ml-2 sm:ml-3 flex flex-col items-end gap-1.5 sm:gap-2 shrink-0">
        {/* Quantity Pill Box - Increased h-8 / w-8 layout targets specifically for thumb navigation */}
        <div className="flex items-center gap-1 rounded-full bg-gray-100 p-0.5">
          <button
            onClick={() => decrease(id)}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
            title="Decrease Quantity"
          >
            &minus;
          </button>
          
          <span className="w-5 sm:w-6 text-center text-xs font-bold text-gray-800 select-none">
            {item.qty}
          </span>

          <button
            onClick={() => increase(id)}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-600 shadow-sm transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
            title="Increase Quantity"
          >
            &#43;
          </button>
        </div>

        {/* Remove Button - Padding block added around link text to extend touch boundary dimensions */}
        <button
          onClick={() => removeFromCart(id)}
          className="text-[10px] sm:text-[11px] font-semibold text-gray-400 underline decoration-transparent transition-all duration-150 hover:text-red-500 hover:decoration-red-500 py-0.5 px-1 cursor-pointer"
        >
          Remove
        </button>
      </div>

    </div>
  );
};

export default CartItem;
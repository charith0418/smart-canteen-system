import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const { cart, subtotal, clearCart, completeSale } = useCart();
  const [lastSale, setLastSale] = useState(null);

  // HANDLE SALE
  const handleCompleteSale = async () => {
    const result = await completeSale();

    console.log("SALE RESULT:", result);

    setLastSale(result);
  };

  return (
    /* 📱 MOBILE & 💻 PC: 
       Removed the aggressive 'h-full' to allow the cart to adapt inside layout shifts.
       Added min-h structures so it holds a beautiful solid box footprint on phone views.
    */
    <div className="bg-white p-4 sm:p-5 border border-gray-100 shadow-sm rounded-2xl flex flex-col min-h-[350px] lg:h-[calc(100vh-140px)] lg:sticky lg:top-24">
      
      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-800 mb-4">
        Current Sale
      </h2>

      {/* CART ITEMS LIST TRACK CONTAINER */}
      {/* max-h block prevents the items tray from expanding forever vertically on small phones */}
      <div className="flex-1 overflow-y-auto pr-1 max-h-[300px] lg:max-h-none space-y-2.5">
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm font-medium text-gray-400 italic">Cart is empty</p>
          </div>
        )}

        {cart.map((item) => (
          <CartItem
            key={item._id || item.id}
            item={item}
          />
        ))}
      </div>

      {/* TOTALS & INTERACTION FOOTER PANEL */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex flex-col gap-1 text-sm font-medium text-gray-500 mb-3">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>Rs. {Number(subtotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-baseline mt-1 pt-1 border-t border-dashed border-gray-100">
            <span className="text-gray-800 font-bold">Total:</span>
            <span className="text-xl font-black text-emerald-600">
              Rs. {Number(subtotal).toLocaleString()}
            </span>
          </div>
        </div>

        {/* CONTROLS GRID FRAME */}
        <div className="flex flex-col gap-2.5">
          {/* COMPLETE SALE BUTTON */}
          <button
            onClick={handleCompleteSale}
            className="w-full bg-emerald-600 text-white h-11 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-emerald-600/10 transition-all duration-200 hover:bg-emerald-500 active:scale-[0.98] cursor-pointer"
          >
            Complete Sale
          </button>

          {/* CLEAR BUTTON */}
          <button
            onClick={clearCart}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 h-11 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <RiDeleteBin6Line className="text-base text-gray-400 group-hover:text-gray-600" />
            Clear Cart
          </button>
        </div>

        {/* LAST SALE RECEIPT ACCORDION */}
        {lastSale && (
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200/60 rounded-xl transition-all animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Invoice</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Success</span>
            </div>
            <div className="space-y-1 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Total Collected:</span>
                <span className="font-bold text-slate-800">Rs. {lastSale.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Unique Items:</span>
                <span className="font-bold text-slate-800">{lastSale.items?.length || 0}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
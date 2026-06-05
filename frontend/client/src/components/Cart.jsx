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
    <div className="bg-white p-4 shadow rounded-xl h-full flex flex-col">
      
      <h2 className="text-xl font-semibold mb-3">
        Current Sale
      </h2>

      {/* CART ITEMS */}
      <div className="flex-1 overflow-auto">
        {cart.length === 0 && (
          <p className="text-gray-500">Cart is empty</p>
        )}

        {cart.map((item) => (
          <CartItem
            key={item._id || item.id}
            item={item}
          />
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-4 border-t pt-3 font-semibold">
        <p>Subtotal: Rs. {subtotal}</p>

        <p className="font-bold text-green-600">
          Total: Rs. {subtotal}
        </p>

        {/* COMPLETE SALE BUTTON */}
        <button
          onClick={handleCompleteSale}
          className="w-full mt-2 bg-green-600 text-white py-2 rounded font-semibold"
        >
          Complete Sale
        </button>

        {/* CLEAR BUTTON */}
        <button
          onClick={clearCart}
          className="w-full mt-3 bg-gray-200 text-black py-2 rounded font-semibold flex items-center justify-center gap-2"
        >
          <RiDeleteBin6Line />
          Clear
        </button>

        {/* LAST SALE DISPLAY */}
        {lastSale && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <h3 className="font-bold">Last Sale</h3>
            <p>Total: Rs. {lastSale.total}</p>
            <p>Items: {lastSale.items.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
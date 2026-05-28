import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const { cart, subtotal, clearCart,completeSale} = useCart();

  return (
    <div className="bg-white p-4 shadow rounded-xl h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-3">Current Sale</h2>

      <div className="flex-1 overflow-auto">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-4 border-t pt-3 font-semibold">
        <p>Subtotal: Rs. {subtotal}</p>
        <p className="font-bold text-green-600">
          Total: Rs. {subtotal}
        </p>


        <button onClick={completeSale}className="w-full mt-2 bg-green-600 text-white py-2 rounded font-semibold cursor-pointer" >
          Complete Sale
        </button>

        <button
          onClick={clearCart}
          className="w-full mt-3 bg-white-500 text-black py-2 rounded font-semibold shadow flex items-center justify-center gap-2 cursor-pointer"
        >
          <RiDeleteBin6Line className='text-lg'/>
          <span>Clear</span>
          
        </button>
      </div>
    </div>
  );
};

export default Cart;
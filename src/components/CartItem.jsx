import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { increase, decrease } = useCart();

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition mb-3">

      <div>
        <h3 className="font-semibold text-gray-800 text-lg">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Rs. {item.price} × {item.qty}
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => decrease(item.id)}
          className="w-8 h-8 rounded-lg bg-red-100 text-red-600 font-bold hover:bg-red-200 transition"
        >
          -
        </button>

        <span className="font-semibold text-lg w-5 text-center">
          {item.qty}
        </span>

        <button
          onClick={() => increase(item.id)}
          className="w-8 h-8 rounded-lg bg-green-100 text-green-600 font-bold hover:bg-green-200 transition"
        >
          +
        </button>

      </div>
    </div>
  );
};

export default CartItem;
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null; // safety check

  return (
    <div className='bg-white shadow-md hover:shadow-xl transition duration-300 rounded-2xl p-3 flex flex-col items-center'>
      <img
        src={product.image}
        alt={product.name}
        className='w-24 h-24 object-contain'
      />

      <h2 className="text-lg text-gray-800 font-semibold mt-3">{product.name}</h2>
      <p className="text-green-600 font-bold text-md mt-1">Rs. {product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className='mt-4 bg-green-600 hover:bg-green-700 text-white w-10 h-10 rounded flex items-center shadow-md transition'
      >
        <span className='ml-3.5'>+</span>
      </button>
    </div>
  );
};

export default ProductCard;
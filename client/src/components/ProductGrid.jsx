import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ FETCH FROM BACKEND INSTEAD OF HARDCODED DATA
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/items", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading items...</p>;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
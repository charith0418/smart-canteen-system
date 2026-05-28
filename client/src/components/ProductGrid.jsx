import products from "../data/product";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
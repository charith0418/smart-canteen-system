import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";

const Dashboard = () => {
  return (
    <div className="flex gap-6 p-6 bg-gray-100">
      
      {/* LEFT SIDE */}
      <div className="w-2/3 bg-gray-100 rounded-xl">
        <h1 className="p-4 text-xl font-bold">
          All Items
        </h1>

        <ProductGrid />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/3">
        <Cart />
      </div>

    </div>
  );
};

export default Dashboard;
import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-3 sm:p-6 bg-gray-100 min-h-screen">
      
      {/* ITEMS GALLERY: Takes full width on mobile, 2/3 width on PC monitors */}
      <div className="w-full lg:w-2/3 bg-gray-100 rounded-xl">
        <h1 className="p-2 sm:p-4 text-lg sm:text-xl font-bold text-gray-800">
          All Items
        </h1>

        <ProductGrid />
      </div>

      {/* CHECKOUT CART PANEL: Drops below the grid on mobile, stays pinned to the right on PC */}
      <div className="w-full lg:w-1/3">
        <Cart />
      </div>

    </div>
  );
};

export default Dashboard;
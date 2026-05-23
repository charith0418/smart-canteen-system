import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />
          <Dashboard />
        </div>
      </div>
    </CartProvider>
  );
};

export default App;
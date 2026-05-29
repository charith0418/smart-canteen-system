import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Reports from "./components/Reports";
import LoginForm from "./pages/LoginForm";
import { CartProvider } from "./context/CartContext";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // ✅ If not logged in show ONLY login page (no Sidebar/Navbar)
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="*" element={<LoginForm />} />
      </Routes>
    );
  }

  return (
    <CartProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
};

export default App;
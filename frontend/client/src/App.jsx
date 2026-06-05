import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Reports from "./components/Reports";
import LoginForm from "./pages/LoginForm";
import { CartProvider } from "./context/CartContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // This hook runs IMMEDIATELY when the application first boots up in the browser
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    
    // If the browser memory contains "true", log the user in automatically!
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
    
    setLoading(false); // Finished checking browser memory, turn off loading screen
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-xl font-bold text-gray-600 animate-pulse">Loading System...</div>
      </div>
    );
  }

  // Hide layouts completely if the user is unauthenticated or on the login path
  const isLoginPage = location.pathname === "/login" || !isLoggedIn;

  return (
    <CartProvider>
      <div className="flex h-screen bg-gray-50 w-full overflow-hidden">
        
        {/* Only mount layout menus if the user is verified and logged in */}
        {!isLoginPage && <Sidebar setIsLoggedIn={setIsLoggedIn} />}

        <div className="flex-1 flex flex-col overflow-hidden w-full">
          {!isLoginPage && <Navbar setIsLoggedIn={setIsLoggedIn} />}
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
            <Routes>
              {/* If already logged in, redirect away from /login straight to dashboard */}
              <Route 
                path="/login" 
                element={!isLoggedIn ? <LoginForm setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/" 
                element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
              />
              
              <Route 
                path="/reports" 
                element={isLoggedIn ? <Reports /> : <Navigate to="/login" />} 
              />
              
              {/* Catch-all safety fallback router guard */}
              <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
            </Routes>
          </main>
        </div>

      </div>
    </CartProvider>
  );
};

export default App;
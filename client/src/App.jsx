import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Reports from "./components/Reports";
import LoginForm from "./pages/LoginForm"
import { CartProvider } from "./context/CartContext";
import {Routes , Route} from "react-router-dom";

const App = () => {

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <CartProvider>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path ="/login" element ={  <LoginForm />} />
            <Route path = "/" element= {isLoggedIn ? <Dashboard /> : <LoginForm /> } />
            <Route path ="/reports" element ={isLoggedIn ? <Reports /> : <LoginForm/>} />
          </Routes>
        
        </div>
      </div>
    </CartProvider>
  );
};

export default App;
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiSearch } from "react-icons/fi"; // Clean vector icons

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Wipe authentication markers from browser memory
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    // 2. Turn off state in App.jsx so layouts hide immediately
    setIsLoggedIn(false);

    // 3. Force route change back to the login gateway
    navigate("/login");
  };

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
      
      {/* LEFT COLUMN: PAGE IDENTITY BREADCRUMB */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          SMART CANTEEN SYSTEM
        </h1>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          Real-time POS terminal metrics
        </p>
      </div>

      {/* RIGHT SIDE CONTROLS CONTAINER */}
      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4">
        
        {/* POLISHED SEARCH BAR TRACK */}
        <div className="group relative flex flex-1 sm:w-64 items-center rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 transition-all duration-200 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100">
          <FiSearch className="text-gray-400 text-md transition-colors group-focus-within:text-emerald-500" />
          <input 
            type="text" 
            placeholder="Search catalog food..." 
            className="w-full ml-2 bg-transparent text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* COMPACT SAAS-STYLE LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50/60 px-4 py-2 text-xs font-bold text-red-600 transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-md hover:shadow-red-500/10 active:scale-[0.98] cursor-pointer"
          title="Disconnect from active session"
        >
          <FiLogOut className="text-sm stroke-[2.5]" />
          <span className="hidden xs:inline">Log Out</span>
        </button>
        
      </div>
      
    </div>
  );
};

export default Navbar;
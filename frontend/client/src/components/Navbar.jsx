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
    /* 📱 MOBILE: Less padding, tighter rounded corners, small bottom margin to stay clear of items grid
       💻 PC MONITOR: Back to full px-6 py-4, rounded-2xl layout
    */
    <div className="w-full bg-white border border-gray-100 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-sm flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 select-none mb-4">
      
      {/* LEFT COLUMN: PAGE IDENTITY BREADCRUMB */}
      <div className="text-center sm:text-left">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
          SMART CANTEEN SYSTEM
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">
          Real-time POS terminal metrics
        </p>
      </div>

      {/* RIGHT SIDE CONTROLS CONTAINER */}
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
        
        {/* POLISHED SEARCH BAR TRACK */}
        <div className="group relative flex flex-1 sm:w-64 items-center rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 transition-all duration-200 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100">
          <FiSearch className="text-gray-400 text-sm sm:text-md transition-colors group-focus-within:text-emerald-500" />
          <input 
            type="text" 
            placeholder="Search catalog food..." 
            className="w-full ml-2 bg-transparent text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* COMPACT SAAS-STYLE LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex h-9 sm:h-auto items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-red-100 bg-red-50/60 px-3 sm:px-4 py-2 text-xs font-bold text-red-600 transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-md hover:shadow-red-500/10 active:scale-[0.98] cursor-pointer shrink-0"
          title="Disconnect from active session"
        >
          <FiLogOut className="text-sm stroke-[2.5]" />
          {/* Changed breakpoint tag from 'xs:inline' to 'sm:inline' to ensure it hides properly on all phones */}
          <span className="hidden sm:inline">Log Out</span>
        </button>
        
      </div>
      
    </div>
  );
};

export default Navbar;
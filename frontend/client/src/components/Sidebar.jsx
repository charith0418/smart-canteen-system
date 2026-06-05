import React from 'react';
import Logo_png from '../assets/logo-2.png';
import { FaHome, FaShoppingCart, FaChartBar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  // Hook to get the current URL route for dynamic link highlighting
  const location = useLocation();

  // Navigation config array to keep the menu rendering dry and highly maintainable
  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: <FaHome className="text-lg" />,
    },
    {
      path: "/reports",
      label: "Reports",
      icon: <FaChartBar className="text-lg" />,
    }
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 text-slate-100 p-5 flex flex-col justify-between select-none">
      
      {/* Upper Content Box */}
      <div>
        {/* Branding Headers */}
        <div className="flex items-center gap-3 px-2 py-1">
          <img
            src={Logo_png}
            alt="Logo"
            className="w-10 h-10 object-contain brightness-110"
          />
          <div className="flex flex-col">
            <h1 className="text-md font-bold tracking-wide text-white leading-tight">
              Smart Canteen
            </h1>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-medium font-sans">
              Sales System
            </span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px bg-slate-800 my-6 mx-2" />

        {/* Unordered Menu List Navigation */}
        <nav>
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              // Check if this menu path matches the current browser location string
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    {/* Icon wrapper handling dynamic colored state maps */}
                    <span className={`${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400"
                    } transition-colors duration-200`}>
                      {item.icon}
                    </span>
                    
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Optional Premium Bottom Meta-Signature block */}
      <div className="px-3 py-2 rounded-xl bg-slate-800/40 border border-slate-800/60 text-center">
        <p className="text-[11px] text-slate-500 font-medium">Terminal v1.4.2</p>
      </div>

    </div>
  );
};

export default Sidebar;
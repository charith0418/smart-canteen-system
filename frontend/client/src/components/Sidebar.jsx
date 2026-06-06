import React from 'react';
import Logo_png from '../assets/logo-2.png';
import { FaHome, FaChartBar } from "react-icons/fa";
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
    /* 📱 MOBILE: fixed bottom bar (w-full h-16 bottom-0 left-0)
      💻 PC MONITOR: vertical left sidebar (lg:w-64 lg:h-screen lg:relative lg:flex-col)
    */
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full border-t border-slate-800 bg-slate-900 p-2 text-slate-100 select-none justify-around items-center lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:w-64 lg:flex-col lg:justify-between lg:border-t-0 lg:border-r lg:p-5">
      
      {/* Upper Content Box: Hidden on mobile branding, visible on PC */}
      <div className="w-full lg:block">
        {/* Branding Headers (Hidden on phone screens to save real estate) */}
        <div className="hidden lg:flex items-center gap-3 px-2 py-1">
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

        {/* Divider Line (Hidden on phone screens) */}
        <div className="hidden lg:block h-px bg-slate-800 my-6 mx-2" />

        {/* Navigation Wrapper: Flex row on mobile, space-y vertical list on PC */}
        <nav className="w-full">
          <ul className="flex w-full justify-around items-center gap-1 lg:flex-col lg:space-y-1.5 lg:justify-start">
            {menuItems.map((item) => {
              // Check if this menu path matches the current browser location string
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path} className="w-full flex-1 lg:flex-none">
                  <Link
                    to={item.path}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 px-2 py-1.5 lg:px-4 lg:py-3 rounded-xl font-medium text-xs lg:text-sm transition-all duration-200 group ${
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
                    
                    <span className="text-[10px] lg:text-sm tracking-wide">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Version footer badge (Hidden on mobile phones to maintain clean space) */}
      <div className="hidden lg:block w-full px-3 py-2 rounded-xl bg-slate-800/40 border border-slate-800/60 text-center">
        <p className="text-[11px] text-slate-500 font-medium">Terminal v1.4.2</p>
      </div>

    </div>
  );
};

export default Sidebar;
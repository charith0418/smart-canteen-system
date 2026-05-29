import React from "react";
import {
  FaChartBar,
  FaShoppingCart,
  FaMoneyBillWave,
  FaPercent,
  FaCalendarAlt,
  FaHome,
  FaBox,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaUtensils,
} from "react-icons/fa";

const Reports = () => {
  const salesData = [
    {
      time: "12 AM - 04 AM",
      transactions: 12,
      items: 28,
      sales: "Rs. 2,400",
    },
    {
      time: "04 AM - 08 AM",
      transactions: 18,
      items: 45,
      sales: "Rs. 3,800",
    },
    {
      time: "08 AM - 12 PM",
      transactions: 32,
      items: 80,
      sales: "Rs. 6,400",
    },
    {
      time: "12 PM - 04 PM",
      transactions: 38,
      items: 95,
      sales: "Rs. 7,600",
    },
    {
      time: "04 PM - 08 PM",
      transactions: 20,
      items: 50,
      sales: "Rs. 4,200",
    },
    {
      time: "08 PM - 12 AM",
      transactions: 8,
      items: 22,
      sales: "Rs. 1,200",
    },
  ];

  const topItems = [
    { item: "Tea", qty: 120, sales: "Rs. 6,000" },
    { item: "Bun", qty: 80, sales: "Rs. 6,400" },
    { item: "Rice", qty: 60, sales: "Rs. 15,000" },
    { item: "Noodles", qty: 40, sales: "Rs. 8,000" },
    { item: "Samosa", qty: 20, sales: "Rs. 1,200" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#0B1220] text-white flex flex-col justify-between p-5">
        <div>
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <div className="bg-green-500 p-3 rounded-xl">
              <FaUtensils className="text-white text-xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-green-400">
                Smart Canteen
              </h1>

              <p className="text-gray-400 text-sm">
                Sales System
              </p>
            </div>
          </div>

          {/* Menu */}
          <ul className="space-y-3">
            <li className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <FaHome />
              Dashboard
            </li>

            <li className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <FaShoppingCart />
              Sell Items
            </li>

            <li className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <FaBox />
              Items
            </li>

            <li className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <FaMoneyBillWave />
              Sales
            </li>

            {/* Active Menu */}
            <li className="flex items-center gap-3 p-3 bg-green-500 rounded-lg cursor-pointer">
              <FaChartBar />
              Reports
            </li>

            <li className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <FaUsers />
              Users
            </li>

            <li className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
              <FaCog />
              Settings
            </li>
          </ul>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-3 p-3 text-red-400 hover:bg-gray-800 rounded-lg">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Reports
            </h2>

            {/* Tabs */}
            <div className="flex gap-6 mt-3 text-sm font-medium">
              <button className="text-green-500 border-b-2 border-green-500 pb-1">
                Daily Report
              </button>

              <button className="text-gray-500 hover:text-black">
                Monthly Report
              </button>

              <button className="text-gray-500 hover:text-black">
                Item Report
              </button>

              <button className="text-gray-500 hover:text-black">
                Custom Range
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Date */}
            <div className="bg-white px-4 py-2 rounded-xl shadow flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>20 May 2026</span>
            </div>

            {/* User */}
            <div className="bg-white px-4 py-2 rounded-xl shadow flex items-center gap-3">
              <img
                src=""
                alt="Admin"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold">Admin</p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          {/* Total Sales */}
          <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Total Sales
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Rs. 25,600
              </h3>
            </div>

            <div className="bg-green-100 p-3 rounded-xl">
              <FaMoneyBillWave className="text-green-600 text-xl" />
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Total Transactions
              </p>

              <h3 className="text-2xl font-bold mt-2">
                128
              </h3>
            </div>

            <div className="bg-yellow-100 p-3 rounded-xl">
              <FaShoppingCart className="text-yellow-600 text-xl" />
            </div>
          </div>

          {/* Items Sold */}
          <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Items Sold
              </p>

              <h3 className="text-2xl font-bold mt-2">
                320
              </h3>
            </div>

            <div className="bg-blue-100 p-3 rounded-xl">
              <FaBox className="text-blue-600 text-xl" />
            </div>
          </div>

          {/* Discounts */}
          <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Discounts
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Rs. 350
              </h3>
            </div>

            <div className="bg-pink-100 p-3 rounded-xl">
              <FaPercent className="text-pink-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-2 gap-6">
          {/* Sales Summary */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">
              Sales Summary
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Transactions</th>
                  <th className="pb-3">Items Sold</th>
                  <th className="pb-3">Total Sales</th>
                </tr>
              </thead>

              <tbody>
                {salesData.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none"
                  >
                    <td className="py-3">{data.time}</td>
                    <td>{data.transactions}</td>
                    <td>{data.items}</td>
                    <td>{data.sales}</td>
                  </tr>
                ))}

                <tr className="font-bold text-green-600">
                  <td className="pt-4">Total</td>
                  <td className="pt-4">128</td>
                  <td className="pt-4">320</td>
                  <td className="pt-4">Rs. 25,600</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Top Selling Items */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">
              Top Selling Items
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Item</th>
                  <th className="pb-3">Quantity</th>
                  <th className="pb-3">Total Sales</th>
                </tr>
              </thead>

              <tbody>
                {topItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none"
                  >
                    <td className="py-3">{item.item}</td>
                    <td>{item.qty}</td>
                    <td>{item.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="w-full mt-6 border rounded-xl py-3 hover:bg-gray-100 transition">
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
import React from 'react'
import Logo_png from '../assets/logo-2.png'
import { FaHome, FaShoppingCart, FaChartBar } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-green-900 text-white p-5">
            <div className='flex items-center gap-3'>
             <img
             src={Logo_png}
             alt="Logo"
             className='w-13 h-13 object-contain'
             />
            <h1 className='text-xl font-semibold leading-none'>
            Smart Canteen
            </h1>
             </div>
            <p className='opacity-80 mb-10 ml-16 leading-none'>Sales System</p>
           

            <ul className='space-y-5'>
                <li className="flex items-center gap-3 cursor-pointer">
                    <FaHome />
                    <span>Dashboard</span>
                </li>
                <li className="flex items-center gap-3 cursor-pointer">
                    <FaShoppingCart />
                    <span>Sales</span>
                </li>
                <li className="flex items-center gap-3 cursor-pointer">
                    <FaChartBar />
                    <span>Reports</span>
                </li>

            </ul>

        </div>
    )
}
export default Sidebar
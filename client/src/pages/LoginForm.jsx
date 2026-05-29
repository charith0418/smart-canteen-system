import React, { useState } from 'react'
import Hero_png from '../assets/hero.png'
import Logo_png from '../assets/logo.png'
import { HiLockClosed } from "react-icons/hi"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const App = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ✅ CALL BACKEND
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/");
        window.location.reload(); // ✅ refresh so App.jsx picks up login state
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Cannot connect to server. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-slate-100 p-5'>
      <div className='form-container flex w-11/12 max-w-screen-xl bg-white rounded-2xl overflow-hidden shadow-xl min-h-[650px]'>

        {/* LEFT SIDE */}
        <div className='illustration-section w-1/2 h-auto overflow-hidden hidden md:block'>
          <img src={Hero_png} alt="Hero" className='w-full h-full object-cover' />
        </div>

        {/* RIGHT SIDE */}
        <div className='form-section w-full md:w-1/2 flex justify-center items-center p-8 md:p-12'>
          <div className='w-full max-w-md'>

            {/* LOGO */}
            <div className='flex flex-col items-center justify-center'>
              <img src={Logo_png} alt="Logo" className='w-16 h-16 object-contain' />
              <h1 className='text-3xl font-bold text-neutral-800 mt-5'>Smart Canteen</h1>
              <p className='text-gray-500 mt-1'>Sales Management System</p>
            </div>

            {/* TITLE */}
            <div className='text-center mt-12 mb-8'>
              <h2 className='text-2xl font-semibold text-gray-800'>Login to your account</h2>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className='bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg p-3 text-center mb-4'>
                {error}
              </div>
            )}

            {/* USERNAME */}
            <div className='border border-gray-300 rounded-lg p-4 flex items-center gap-3 mt-4'>
              <FaUser className='text-gray-500 text-lg' />
              <input
                type='text'
                placeholder='Username'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className='outline-none w-full text-gray-700'
              />
            </div>

            {/* PASSWORD */}
            <div className='border border-gray-300 rounded-lg p-4 flex items-center gap-3 mt-4'>
              <HiLockClosed className='text-gray-500 text-lg' />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='outline-none w-full text-gray-700'
              />
            </div>

            {/* OPTIONS */}
            <div className='flex justify-between items-center mt-6'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type='checkbox' className='cursor-pointer' />
                <span className='text-sm text-gray-600'>Remember me</span>
              </label>
              <a href="#" className='text-sm text-blue-500 hover:underline'>Forgot password?</a>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className='bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-semibold py-3 w-full rounded-lg mt-6 cursor-pointer disabled:opacity-60'
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
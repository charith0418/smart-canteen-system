import React from 'react'
import Hero_png from '../src/assets/hero.png'
import Logo_png from '../src/assets/logo.png'

import { HiLockClosed } from "react-icons/hi"
import { FaUser } from "react-icons/fa"

function IconInput({ children, placeholder, type }) {
  return (
    <div className='border border-gray-300 rounded-lg p-4 flex items-center gap-3 mt-4'>

      <span className='text-gray-500 text-lg'>
        {children}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        className='outline-none w-full text-gray-700'
      />

    </div>
  )
}

const App = () => {
  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-slate-100 p-5'>

      {/* MAIN CARD */}
      <div className='form-container flex w-11/12 max-w-screen-xl bg-white rounded-2xl overflow-hidden shadow-xl min-h-[650px]'>

        {/* LEFT SIDE */}
        <div className='illustration-section w-1/2 h-auto overflow-hidden hidden md:block'>

          <img
            src={Hero_png}
            alt="Hero"
            className='w-full h-full object-cover'
          />

        </div>

        {/* RIGHT SIDE */}
        <div className='form-section w-full md:w-1/2 flex justify-center items-center p-8 md:p-12'>

          <div className='w-full max-w-md'>

            {/* LOGO */}
            <div className='flex flex-col items-center justify-center'>

              <img
                src={Logo_png}
                alt="Logo"
                className='w-16 h-16 object-contain'
              />

              <h1 className='text-3xl font-bold text-neutral-800 mt-5'>
                Smart Canteen
              </h1>

              <p className='text-gray-500 mt-1'>
                Sales Management System
              </p>

            </div>

            {/* TITLE */}
            <div className='text-center mt-12 mb-8'>

              <h2 className='text-2xl font-semibold text-gray-800'>
                Login to your account
              </h2>

            </div>

            {/* USERNAME */}
            <IconInput
              placeholder='Username'
              type='text'
            >
              <FaUser />
            </IconInput>

            {/* PASSWORD */}
            <IconInput
              placeholder='Password'
              type='password'
            >
              <HiLockClosed />
            </IconInput>

            {/* OPTIONS */}
            <div className='flex justify-between items-center mt-6'>

              <label className='flex items-center gap-2 cursor-pointer'>

                <input
                  type='checkbox'
                  className='cursor-pointer'
                />

                <span className='text-sm text-gray-600'>
                  Remember me
                </span>

              </label>

              <a
                href="#"
                className='text-sm text-blue-500 hover:underline'
              >
                Forgot password?
              </a>

            </div>

            {/* BUTTON */}
            <button className='bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-semibold py-3 w-full rounded-lg mt-6'>

              Login

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App
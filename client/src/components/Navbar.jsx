import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white p-4 rounded-xl shadow flex justify-between items-center'>

        <h1 className="text-2xl font-semibold">Smart Canteen Dashboard</h1>

        <input type='text' placeholder='Search food...' className='border p-2 rounded-lg'/>
      
    </div>
  )
}

export default Navbar

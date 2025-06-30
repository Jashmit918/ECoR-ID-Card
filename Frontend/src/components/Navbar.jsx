import React from 'react'

export default function Navbar() {
  return (
    <div className='h-28 bg-emerald-800 w-full fixed flex justify-between items-center p-5 z-10'>
      <div className='flex flex-col justify-center items-center gap-1'>
        <img src="railways-logo.png" alt="" className='w-12'/>
        <div className='font-semibold text-md font-sans text-white'>East Coast Railway</div>
      </div>
      <div>
        <h2 className='font-bold text-xl font-sans text-white'>Online form for I-cards</h2>
      </div>
      <div className='flex flex-col justify-center items-center gap-1'>
        <div className='font-semibold text-md font-sans text-white'>Developed by IT Center</div>
        <img src="railways-logo.png" alt="" className='w-12'/>
      </div>
    </div>
  )
}
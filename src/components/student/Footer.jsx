import React from 'react'
import { assets } from '../../assets/images/assets'
const { logo_white } = assets;
const Footer = () => {
  return (
    <div className='bg-[#111820]'>
      <div className=' max-w-7xl mx-auto py-10 px-4 '>

        <div className='flex flex-col md:flex-row justify-between items-start gap-10'>

          {/* First Column */}
          <div className='flex flex-col gap-4 max-w-[400px]'>
            <img loading='lazy' className='w-40 lg:w-56 cursor-pointer mb-5' src={logo_white} alt="educoreLogo" />
            <div className='text-white text-left'>
              <h2 className='text-2xl font-semibold'>Join our community</h2>
              <p className='text-gray-400'>Stay updated with the latest courses and resources.</p>
              <p className='text-gray-400 mt-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
            </div>
          </div>

          {/* Second Column */}
          <div className='flex flex-col gap-3 flex-1 items-center'>
            <p className='text-2xl text-white font-semibold -ml-2'>Company</p>
            <ul className='flex flex-col gap-2 items-start'>
              <li className='text-white text-lg font-medium cursor-pointer hover:text-gray-400'>Home</li>
              <li className='text-white text-lg font-medium cursor-pointer hover:text-gray-400'>About Us</li>
              <li className='text-white text-lg font-medium cursor-pointer hover:text-gray-400'>Courses</li>
              <li className='text-white text-lg font-medium cursor-pointer hover:text-gray-400'>Contact Us</li>
              <li className='text-white text-lg font-medium cursor-pointer hover:text-gray-400'>Privacy Policy</li>
            </ul>
          </div>

          {/* Third Column */}
          <div className='flex flex-col gap-4 flex-1'>
            <p className='text-2xl text-white font-semibold'>Subscribe to our newsletter</p>
            <p className='text-gray-400'>The latest news, articles, and resources, sent to your inbox weekly.</p>
            <div className='flex flex-col md:flex-row gap-2'>
              <input type="email" placeholder='Enter your email' className='text-white p-2 rounded-md focus:outline-none focus:ring-2 bg-gray-800 flex-1' />
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'>
                Subscribe
              </button>
            </div>
          </div>

        </div>
        <div className='w-full h-[2px] bg-gray-600 my-5'></div>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-gray-400 text-xl lg:text-center text-left w-full'>Copyright © 2024 Educore. All rights reserved.</p>
        </div>

      </div>
    </div>
  )
}

export default Footer
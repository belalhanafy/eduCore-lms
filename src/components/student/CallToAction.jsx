import React from 'react'
import { assets } from '../../assets/images/assets'
import { Link } from 'react-router'
const { rightArrow } = assets
const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-20 pb-24'>
      <h2 className='text-xl md:text-4xl to-gray-800 font-semibold'>Learn anything, anytime, anywhere</h2>
      <p className='text-gray-500 max-w-2xl text-center'>Join our community of learners and educators. Explore a world of knowledge and skills at your fingertips.</p>
      <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>
        {/* get started btn */}
        <Link to="/auth/sign-in">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'>
            Get Started Now
          </button>
        </Link>
        {/* learn more btn */}
        <button className='group inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ml-4'>
          <span> Read More</span>
        </button>

      </div>
    </div>
  )
}

export default CallToAction
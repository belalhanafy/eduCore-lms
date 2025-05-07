import React from 'react'
import { assets } from '../../assets/images/assets'
const { logo, facebook_icon, twitter_icon, instagram_icon } = assets;
const Footer = () => {
  return (
    <div className=' max-w-8xl mx-auto py-2 px-4 border border-t-gray-500'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-10'>
        {/* First Column */}
        <div className='flex gap-4'>
          <img loading='lazy' className='w-32 lg:w-40 cursor-pointer' src={logo} alt="educoreLogo" />
          <span>|</span>
          <p className='text-gray-400 text-lg lg:text-center text-left w-full'>Copyright © 2024 Educore. All rights reserved.</p>
        </div>

        {/* Second Column */}
        <ul className='flex gap-3'>
          <li>
            <img src={facebook_icon} alt="facebook_icon" loading='lazy' className='w-9 h-9 cursor-pointer hover:bg-blue-200 transition-all duration-300 rounded-full' />
          </li>
          <li>
            <img src={twitter_icon} alt="twitter_icon" loading='lazy' className='w-9 h-9 cursor-pointer hover:bg-blue-200 transition-all duration-300 rounded-full' />
          </li>
          <li>
            <img src={instagram_icon} alt="instagram_icon" loading='lazy' className='w-9 h-9 cursor-pointer hover:bg-blue-200 transition-all duration-300 rounded-full' />
          </li>
        </ul>

      </div>
    </div>
  )
}

export default Footer
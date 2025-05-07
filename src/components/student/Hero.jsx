import React from 'react'
import { assets } from '../../assets/images/assets'
import { div } from 'motion/react-client'
const { sketch } = assets
const Hero = () => {
  return (
    <>
      <div className='flex flex-col lg:gap-10 sm:gap-10 gap-5 justify-center max-w-5xl mx-auto text-center'>
        <h1 className='sm:text-5xl text-3xl mb-3 max-w-4xl mx-auto font-semibold mt-20 sm:mt-0'>
          Empower your future with the courses designed to <span className='text-[#1f548d] relative'><img src={sketch} alt='sketch' loading='lazy' className='w-full lg:block hidden absolute -bottom-10 right-0'></img> fit your choice.</span>
        </h1>
        <p className='sm:block hidden text-gray-500 max-w-2xl mx-auto'>We bring together world-class instructors, interactive content, and a supportive
          community to help you achieve your personal and professional goals.</p>
        <p className='sm:hidden block text-gray-500'>We bring together world-class instructors to help you achieve your professional goals.</p>
          

      </div>
    </>
  )
}

export default Hero
import React from 'react'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'

const Home = () => {
  return (
    <div className='bg-gradient-to-b to-white from-[#c9e7ff]'>
      <div className='flex flex-col lg:gap-10 sm:gap-10 gap-5 items-center justify-end text-center mx-4 xl:mx-0 h-screen mb-20'>
        <Hero />
        <SearchBar />
        <Companies />
        <button onClick={() => {
          const coursesSection = document.getElementById('courses');
          if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }} className="cursor-pointer bg-gray-800 px-3 py-2 mt-8 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none">
          <svg className="w-5 h-5" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col lg:gap-10 gap-5 items-center text-center mx-4 mb-20 scroll-mt-24"
        id='courses'>
        <CoursesSection />
      </div>
      <div className='flex flex-col lg:gap-10 gap-5 items-center text-center mx-4 lg:mx-0'>
        <TestimonialsSection />
      </div>
      <div className='flex flex-col lg:gap-10 gap-5 items-center text-center mx-4 lg:mx-0'>
        <CallToAction />
      </div>
    </div>
  )
}

export default Home
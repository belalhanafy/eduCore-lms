import React, { useContext } from 'react'
import CourseCard from './CourseCard'
import { Link } from 'react-router'
import { AppContext } from '../../context/AppContext';
const CoursesSection = () => {
  const courses = useContext(AppContext)
  return (
    <div className='flex flex-col justify-center mt-10 items-center mx-4'>
      <h2 className='text-3xl font-semibold'>Learn from the best</h2>
      <p className='text-gray-500 max-w-2xl mx-auto'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>
      <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 mt-10 max-w-7xl mx-auto'>
        {courses.courses.slice(0, 4).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      <div className="mt-10">
        <Link to={'/course-list'}>
          <button onClick={()=> scrollTo(0,0)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'>
          Show all courses
          </button>
        </Link>
      </div>

    </div>
  )
}

export default CoursesSection
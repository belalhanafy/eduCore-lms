import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/student/CourseCard'
import { Link, useLocation } from 'react-router'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/student/SearchBar'

const PAGE_SIZE = 8

const CoursesList = () => {
  const { courses } = useContext(AppContext)
  const { pathname } = useLocation()

  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [currentPage, setCurrentPage] = useState(1)


  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE)

  const paginatedData = filteredCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className="mt-32 mb-20 mx-4 xl:mx-0">
      {/* Explore Our Courses */}
      <div className="flex flex-col gap-5 items-center text-center">
        <h2 className="text-3xl font-semibold">Explore Our Courses</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex flex-col lg:flex-row justify-between lg:gap-10 gap-5 items-center">
          <div className="flex flex-col gap-5 lg:items-start items-center">
            <h2 className="text-3xl font-semibold mt-10">All Courses</h2>
            <div className="flex">
              <Link className="text-blue-500" to={'/'}>Home</Link>
              <span className="text-gray-500 mx-2">/</span>
              <p className="text-gray-500 capitalize">{pathname.slice(1).replace('-', " ")}</p>
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className="flex justify-center mt-10 mb-5"> */}
            <SearchBar setFiltered={setFilteredCourses} resetPage={() => setCurrentPage(1)} />
          {/* </div> */}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {paginatedData.length > 0 ? (
            paginatedData.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl">
              No courses found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCourses.length > PAGE_SIZE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={PAGE_SIZE}
            onClickPrev={handlePrev}
            onClickNext={handleNext}
          />
        )}
      </div>
    </div>
  )
}

export default CoursesList

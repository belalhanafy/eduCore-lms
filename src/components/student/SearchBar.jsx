import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const SearchBar = ({ setFiltered, resetPage }) => {
  const { courses } = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchTermLower = searchTerm.trim().toLowerCase()
      const filteredData = courses.filter((course) =>
        course.courseTitle.toLowerCase().includes(searchTermLower)
      )

      if (setFiltered) {
        setFiltered(filteredData)
      }
      if (resetPage) {
        resetPage()
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm, courses])

  return (
    <>
      <form className="w-full max-w-[90%] sm:max-w-[600px]">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" htmlFor="default-search">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400">
              <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" />
            </svg>
          </div>
          <input value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} required placeholder="Search for courses" className="block w-full p-4 py-3 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="default-search" type="search" />
        </div>
      </form>
    </>
  )
}

export default SearchBar
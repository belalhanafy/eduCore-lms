import React, { useContext, useMemo, useState, useRef, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { FaArrowUp, FaXmark } from "react-icons/fa6";
import { IoMdArrowDropup } from "react-icons/io";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

const StudentsEnrolled = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rowsDropdownOpen, setRowsDropdownOpen] = useState(false);
  const rowsDropdownRef = useRef(null);

  const { filteredStudents, courses, educatorId, getEnrolledStudents } = useContext(AppContext);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  const educatorCourses = useMemo(() => {
    return courses.filter((c) => c.educatorId === educatorId);
  }, [courses, educatorId]);

  const handleCourseToggle = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
    setCurrentPage(1); // Reset pagination
  };

  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);


  useEffect(() => {
    getEnrolledStudents();
  }, []);


  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEnrollments = useMemo(() => {
    let enrollments = [];

    filteredStudents.forEach((student) => {
      const studentEnrollments = student.enrolledCourses
        .filter(
          (course) =>
            selectedCourses.length === 0 ||
            selectedCourses.includes(course.courseId)
        )
        .map((course) => ({
          ...course,
          studentId: student._id,
          studentName: student.name,
          studentImage: student.imageUrl,
        }));

      enrollments.push(...studentEnrollments);
    });

    enrollments.sort((a, b) => {
      const aDate = new Date(a.purchaseDate);
      const bDate = new Date(b.purchaseDate);
      return sortDirection === 'asc'
        ? aDate - bDate
        : sortDirection === 'desc'
          ? bDate - aDate
          : 0; // No sorting if sortDirection is empty
    });

    return enrollments;
  }, [filteredStudents, selectedCourses, sortDirection]);

  const totalPages = Math.ceil(filteredEnrollments.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedData = filteredEnrollments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCourses, sortDirection, filteredStudents]);


  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          🎓 Students Enrolled in Your Courses
        </h2>

        {/* Course Filter Dropdown */}
        <div className="relative w-full max-w-xs" ref={dropdownRef}>
          <button
            onClick={handleDropdownToggle}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            {selectedCourses.length
              ? `${selectedCourses.length} course(s) selected`
              : "Filter by Course"}
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md p-2 max-h-60 overflow-y-auto">
              {educatorCourses.map((course) => (
                <label
                  key={course._id}
                  className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course._id)}
                    onChange={() => handleCourseToggle(course._id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-2"
                  />
                  {course.courseTitle}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enrollment Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300 mt-5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-blue-50">
            <tr>
              <th className="px-6 py-4 border-b border-gray-300">#</th>
              <th className="px-6 py-4 border-b border-gray-300">
                Student Name
              </th>
              <th className="px-6 py-4 border-b border-gray-300">
                Course Title
              </th>
              <th className="px-6 py-4 border-b relative">
                <div
                  onClick={() => setSortDropdownOpen(prev => !prev)}
                  className="flex hover:text-blue-600 items-center gap-1 cursor-pointer select-none"
                >
                  Purchase Date
                  {!sortDirection ? (
                    <HiOutlineChevronUpDown className='w-4 h-4' />
                  ) : (
                    <IoMdArrowDropup className={`transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </div>

                {sortDropdownOpen && (
                  <div
                    className="absolute top-full mt-1 bg-white border rounded shadow-md z-10 w-36 text-sm"
                  >
                    <div>
                      <button
                        onClick={() => {
                          setSortDirection('asc');
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 ${sortDirection === 'asc' ? 'bg-gray-100' : ''} hover:bg-gray-100 flex items-center justify-between `}
                      >
                        {sortDirection === 'asc' && <span className="text-blue-500">✓</span>}
                        Ascending <FaArrowUp />
                      </button>
                      <button
                        onClick={() => {
                          setSortDirection('desc');
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 ${sortDirection === 'desc' ? 'bg-gray-100' : ''} hover:bg-gray-100 flex items-center justify-between `}
                      >
                        {sortDirection === 'desc' && <span className="text-blue-500">✓</span>}
                        Descending <FaArrowUp className="transform rotate-180" />
                      </button>
                    </div>

                    <button onClick={() => { setSortDropdownOpen(false); setSortDirection(''); }} className='w-full px-3 py-2 hover:bg-gray-100 flex items-center justify-between mt-1 group border border-gray-500 rounded-lg'>
                      Reset <FaXmark className=' group-hover:text-red-700' />
                    </button>
                  </div>
                )}
              </th>
            </tr>
          </thead>

          {paginatedData.length === 0 ? (
            <tbody className="bg-white text-center text-gray-900 font-semibold">
              <tr className="bg-white hover:bg-gray-50 border-b">
                <td colSpan="4" className="px-6 py-4">
                  No Enrollments Found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white text-gray-900 font-semibold">
              {paginatedData.map((course, index) => (
                <tr
                  key={course.courseId + course.studentId}
                  className="bg-white hover:bg-gray-50 border-b"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="flex items-center px-6 py-4">
                    <img
                      src={course.studentImage}
                      alt="student"
                      className="w-8 h-8 rounded-full"
                      loading="lazy"
                    />
                    <div className="ml-4">{course.studentName}</div>
                  </td>
                  <td className="px-6 py-4">{course.courseTitle}</td>
                  <td className="px-6 py-4">
                    {new Date(course.purchaseDate).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-lg text-gray-600">
          <span className="font-medium">
            Showing{" "}
            <span className="font-medium text-blue-600">
              {(currentPage - 1) * rowsPerPage + 1}
            </span>
          </span>{" "}
          to{" "}
          <span className="font-medium text-blue-600">
            {Math.min(currentPage * rowsPerPage, filteredEnrollments.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-blue-600">
            {filteredEnrollments.length}
          </span>{" "}
          results
        </div>
        <div className="flex items-center justify-between mt-4 gap-10">
          <div
            className="relative flex items-center gap-4"
            ref={rowsDropdownRef}
          >
            <span>Rows per page:</span>
            <button
              onClick={() => setRowsDropdownOpen((prev) => !prev)}
              className="px-2 py-1 text-lg border rounded-lg w-20 text-left bg-white shadow-sm hover:bg-gray-50 flex items-center justify-between"
            >
              <p>{rowsPerPage}</p>

              <div>
                <IoMdArrowDropup
                  className={`transform ${rowsDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </div>
            </button>

            {rowsDropdownOpen && (
              <div className="absolute bottom-full mb-2 z-10 bg-white border rounded-lg shadow-md w-full text-sm">
                {[5, 10, 20, 30, 40].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setRowsPerPage(num);
                      setCurrentPage(1);
                      setRowsDropdownOpen(false);
                    }}
                    className={`flex justify-between items-center w-full px-4 py-2 hover:bg-blue-100 ${rowsPerPage === num
                      ? "font-semibold text-white bg-blue-500 hover:bg-blue-500"
                      : ""
                      }`}
                  >
                    {num}
                    {rowsPerPage === num && (
                      <span className="text-white ml-2">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded 
                        disabled:opacity-50 
                        disabled:bg-transparent 
                        disabled:text-gray-400 
                        disabled:cursor-not-allowed 
                        hover:bg-gray-500 
                        hover:text-white 
                        transition-all duration-300"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded 
                        disabled:opacity-50 
                        disabled:bg-transparent 
                        disabled:text-gray-400 
                        disabled:cursor-not-allowed 
                        hover:bg-gray-500 
                        hover:text-white 
                        transition-all duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentsEnrolled;

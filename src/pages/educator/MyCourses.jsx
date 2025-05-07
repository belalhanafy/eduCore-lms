import React, { useContext, useState, useEffect, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router';

const MyCourses = () => {
  const { educatorId, courses } = useContext(AppContext);
  const [educatorCourses, setEducatorCourses] = useState([]);
  const [courseStatus, setCourseStatus] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const filteredCourses = courses.filter((course) => course.educatorId === educatorId);
      setEducatorCourses(filteredCourses);
    } catch (error) {
      console.error('Error fetching educator Courses:', error);
    }
  }, [educatorId, courses]);

  // only recalculate if educatorCourses changes
  const totalEarnings = useMemo(() => {
    if (!educatorCourses) return 0;
    return educatorCourses.reduce((acc, course) => {
      const earningsPerCourse = (course.coursePrice - (course.coursePrice * course.discount) / 100) * (course.enrolledStudentIds?.length || 0);
      return acc + earningsPerCourse;
    }, 0);
  }, [educatorCourses]);

  const handleCourseStatusChange = (courseID) => {
    setCourseStatus((prevStatus) => {
      const currentStatus = prevStatus[courseID];
      const newStatus = currentStatus === 'Live' ? 'Private' : 'Live';
      return { ...prevStatus, [courseID]: newStatus };
    });
  };

  return (
    <>
      <div className='mb-10'>
        <h2 className='text-4xl font-semibold mb-5'>All Courses</h2>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-5">My Courses</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-blue-50">
              <tr>
                <th className="px-6 py-4 border-b border-gray-300">#</th>
                <th className="px-6 py-4 border-b border-gray-300">Course Name</th>
                <th className="px-6 py-4 border-b border-gray-300">Earnings</th>
                <th className="px-6 py-4 border-b border-gray-300">Students</th>
                <th className="px-6 py-4 border-b border-gray-300">Course Status</th>
                <th className="px-6 py-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            {educatorCourses.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">No courses found</td>
                </tr>
              </tbody>
            ) : (
              educatorCourses.map((course, index) => (
                <tbody key={index} className="bg-white text-gray-900 font-semibold">
                  <tr className="bg-white hover:bg-gray-50 border-b border-gray-300">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="flex items-center justify-start px-6 py-4">
                      <img src={course?.courseThumbnail} loading="lazy" className="w-14 sm:w-24 md:w-28" alt="courseThumbnail" />
                      <div className="flex flex-col ml-8">
                        <p className="py-2">{course?.courseTitle}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      ${((course.coursePrice - (course.coursePrice * course.discount) / 100) * (course.enrolledStudentIds?.length || 0)).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{course?.enrolledStudentIds?.length || 0}</td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={courseStatus[course._id] === 'Live'}
                          onChange={() => handleCourseStatusChange(course._id)}
                          className="sr-only peer"
                        />
                        <div className="group peer ring-0 bg-rose-400 rounded-full w-16 h-8 peer-checked:bg-emerald-500 after:content-[''] after:absolute after:bg-gray-50 after:rounded-full after:h-6 after:w-6 after:top-1 after:left-1 after:transition-all peer-checked:after:translate-x-8" />
                        <p className="ml-2 text-lg">{courseStatus[course._id] || 'Private'}</p>
                      </label>
                    </td>

                    {/* Add an Edit button to each course */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/educator/add-course/${course._id}`)}
                        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                      >
                        Edit
                      </button>
                    </td>

                  </tr>
                </tbody>
              ))
            )}
          </table>
        </div>
        <h2 className="text-xl font-semibold mt-6">Total Earnings: ${totalEarnings.toFixed(2)}</h2>
      </div>
    </>
  );
};

export default MyCourses;

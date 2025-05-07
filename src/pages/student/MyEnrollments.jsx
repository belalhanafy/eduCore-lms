import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from "rc-progress"
import { useNavigate } from 'react-router'
const MyEnrollments = () => {
  const { enrolledCourses, getUserEnrolledCourses, getTotalLectures } = useContext(AppContext)

  const calcCompletedLec = (course) => {
    const completedLectures = course.courseContent.reduce(
      (completed, chapter) => completed + (chapter.chapterContent?.filter((lecture) => lecture.isCompleted)?.length || 0), 0
    );
    return completedLectures
  }
  useEffect(() => {
    getUserEnrolledCourses();
  }, [])

  const nav = useNavigate()
  

  return (
    <div className="mt-32 mb-20 mx-4 xl:mx-0">
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-4">My Enrollments</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-blue-50">
              <tr>
                <th scope="col" className="px-6 py-4 border-b border-gray-300">
                  #
                </th>
                <th scope="col" className="px-6 py-4 border-b border-gray-300">
                  Course
                </th>
                <th scope="col" className="px-6 py-4 border-b border-gray-300">
                  Duration
                </th>
                <th scope="col" className="px-6 py-4 border-b border-gray-300">
                  Completed
                </th>
                <th scope="col" className="px-6 py-4 border-b border-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            {enrolledCourses.length === 0 ? (
              <tbody className="bg-white text-center text-gray-900 font-semibold">
                <tr className="bg-white hover:bg-gray-50 border-b border-gray-300">
                  <td colSpan="5" className="px-6 py-4">
                    No Enrollments Found
                  </td>
                </tr>
              </tbody>
            ) : (<>
              {enrolledCourses.map((course, index) => {
                const completed = calcCompletedLec(course);
                const total = getTotalLectures(course);

                return (
                  <tbody key={index} className="bg-white text-gray-900 font-semibold">
                    <tr onClick={() => nav(`/player/${course._id}`)} className="bg-white hover:bg-gray-50 border-b border-gray-300">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="flex items-center justify-start px-6 py-4">
                        <img src={course.courseThumbnail} loading="lazy" className="w-14 sm:w-24 md:w-28" alt="courseThumbnail" />
                        <div className="flex flex-col ml-8">
                          <p className="py-2">{course.courseTitle}</p>
                          <Line percent={total ? (completed / total) * 100 : 0} strokeWidth="2" strokeColor="#3b82f6" trailWidth="2" trailColor="#e5e7eb" className="w-full" />
                        </div>
                      </td>
                      <td className="px-6 py-4">{course.courseDuration}</td>
                      <td className="px-6 py-4">{`${completed} / ${total}`} <span>Lectures</span></td>
                      <td className="px-6 py-4">
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                          {completed !== total ? "On Going" : "Completed"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                )
              })}

            </>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyEnrollments

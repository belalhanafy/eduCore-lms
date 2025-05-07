import React, { useContext, useEffect, useState } from 'react'
import Accordion from '../../components/Accordion'
import { useParams } from 'react-router'
import { AppContext } from '../../context/AppContext'
import YouTube from 'react-youtube'
import Rating from '../../components/student/Rating'

const Player = () => {
  const { courseId } = useParams()
  const { getSingleCourse, studentId } = useContext(AppContext)
  const course = getSingleCourse(courseId)

  const [playerData, setPlayerData] = useState(null)
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    if (course) {
      const studentRatingObj = course.courseRatings.find(rating => rating.studentId === studentId)
      if (studentRatingObj) {
        setUserRating(studentRatingObj.rating)
      }
    }

  }, [course, studentId])

  const handleRating = (newRating) => {
    setUserRating(newRating)

    // Remove previous rating of the student if exists
    const filteredRatings = course.courseRatings.filter(rating => rating.studentId !== studentId)

    // Add new rating
    course.courseRatings = [
      ...filteredRatings,
      { studentId, rating: newRating }
    ]
  }


  if (!course) {
    return <div className="mt-32 text-center text-2xl font-semibold">Course not found</div>
  }

  return (
    <div className="mt-32 mb-20 mx-4 xl:mx-0">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-semibold mb-5">Course Structure</h2>
            <Accordion setPlayerData={setPlayerData} course={course} />

            <div className="mt-8 flex items-center gap-5">
              <h2 className="text-slate-500 font-semibold">Rate This Course:</h2>
              <Rating initialRating={userRating} onRate={handleRating} />
            </div>

            <p className="mt-4 text-lg">Your Rating: {userRating} ⭐</p>
          </div>

          <div>
            {playerData ? (
              <div>
                <YouTube
                  videoId={playerData.videoId}
                  opts={{ playerVars: { autoplay: 1 } }}
                  iframeClassName="w-full aspect-video"
                />
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-start lg:items-center justify-between mt-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {playerData.chapter}.{playerData.lecture}. {playerData.lectureTitle}
                  </h2>
                  {playerData.isCompleted ? (
                    <button className="cursor-auto bg-green-500 text-white font-bold py-2 px-5 rounded-lg shadow-md  mt-3 lg:mt-0">
                      Completed
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPlayerData({
                          ...playerData,
                          isCompleted: true,
                        });

                        // ALSO update the course content lecture
                        const chapterIndex = playerData.chapter - 1;
                        const lectureIndex = playerData.lecture - 1;

                        if (
                          course &&
                          course.courseContent[chapterIndex] &&
                          course.courseContent[chapterIndex].chapterContent[lectureIndex]
                        ) {
                          course.courseContent[chapterIndex].chapterContent[lectureIndex].isCompleted = true;
                        }
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-3 lg:mt-0"
                    >
                      Mark Complete
                    </button>


                  )}
                </div>
              </div>
            ) : (
              <img
                src={course.courseThumbnail}
                alt="Course Thumbnail"
                loading="lazy"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player

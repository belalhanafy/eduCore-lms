import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/images/assets'
import Accordion from '../../components/Accordion';
import YouTube from 'react-youtube';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
const { star, star_blank, lesson_icon, time_clock_icon, time_left_clock_icon } = assets
const CourseDetails = () => {

  const { courseId } = useParams();
  const { getSingleCourse, getAverageRating, getCourseTime, getTotalLectures, handleGoToPayment, allEducators, addToCart, addToWishList, removeFromWishList,
    cart, wishList, studentId, isStudent } = useContext(AppContext);
  const EducatorName = allEducators.find((educator) => educator.courses.includes(courseId))?.name;
  const [playerData, setPlayerData] = useState(null);
  const course = getSingleCourse(courseId);
  const averageRating = getAverageRating(course);
  const courseTime = getCourseTime(course);
  const totalLectures = getTotalLectures(course);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  console.log(studentId);

  useEffect(() => {
    setIsEnrolled(course?.enrolledStudentIds?.includes(studentId));
    setIsInCart(cart.some(item => item._id === courseId));
    setIsInWishlist(wishList.some(item => item._id === courseId));
  }, [course, studentId, cart, wishList, courseId]);

  const nav = useNavigate();
  if (!course) {
    return <div>Course not found</div>;
  }

  const handleWishListClick = () => {
    if (isStudent) {
      if (isInWishlist) {
        removeFromWishList(course);
      } else {
        addToWishList(course);
      }
    } else {
      nav("/auth/sign-in");
    }
  };

  const handleCartClick = () => {
    if (isStudent) {
      if (isInCart) {
        nav('/cart');
      } else {
        addToCart(course);
      }
    } else {
      nav("/auth/sign-in");
    }
  };

  const handleEnrollClick = () => {
    if (isStudent) {
      if (!isEnrolled) {
        handleGoToPayment(course, ((course.coursePrice * (100 - course.discount)) / 100).toFixed(2));
      } else {
        nav(`/player/${courseId}`);
      }
    } else {
      nav("/auth/sign-in");
    }
  };

  return (
    <div className='bg-gradient-to-b to-white from-[#c9e7ff]'>
      <div className='container mx-auto p-4 pt-6 md:p-6 lg:p-8 max-w-7xl'>
        <div className='flex flex-col lg:flex-row gap-10 items-start mt-28 mb-10 mx-4 lg:mx-0'>
          <div className='flex flex-col lg:flex-row gap-10 items-start'>
            <div className='flex flex-col gap-5 max-w-2xl'>
              <h2 className='text-4xl font-semibold'>{course.courseTitle}</h2>
              <div
                className="prose max-w-none text-gray-500"
                dangerouslySetInnerHTML={{ __html: course.courseDescription.slice(0, 200) }} // Display first 200 characters
              />
              <div className='flex items-center gap-2'>
                <p className='text-gray-500'>{averageRating}</p>
                <div className='flex'>
                  {Array(5).fill(0).map((_, index) => (
                    <img className="w-4 h-4" alt="Rating Star" src={index < Math.floor(averageRating) ? star : star_blank} key={index} />
                  ))}

                </div>
                <p className="text-blue-500">
                  ({course.courseRatings.length} {course.courseRatings.length === 1 ? 'rating' : 'ratings'})
                </p>

                <p className="text-gray-500">
                  {course.enrolledStudentIds.length} {course.enrolledStudentIds.length === 1 ? 'Student' : 'Students'}
                </p>
              </div>
              <p>Course By <a href="#" className='text-blue-500 underline'>{EducatorName}</a></p>
              <p>Last Updated: <span>
                {new Date(course.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              </p>


              <div>
                <h2 className='text-2xl font-semibold '>Course Structure</h2>
                <div className='flex items-center gap-5 mb-5'>
                  <p className='text-gray-500'>{totalLectures} Lectures</p>
                  <span>-</span>
                  <p className='text-gray-500'>{courseTime} total duration</p>
                </div>
                <Accordion setPlayerData={setPlayerData} course={course} />
              </div>

              <div>
                <h2 className='text-2xl font-semibold mb-5'>Course Description</h2>
                <div
                  className="prose max-w-none rich-text text-gray-500"
                  dangerouslySetInnerHTML={{ __html: course.courseDescription }}
                />
              </div>

            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {playerData ? (
              <YouTube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
            ) : (
              <img
                src={course.courseThumbnail}
                alt="Course Image"
                loading="lazy"
                className="w-full h-40 sm:h-48 md:h-52 lg:h-60 xl:h-72 object-cover"
              />
            )}

            <div className="flex flex-col gap-4 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-red-500 text-sm sm:text-base">
                <img src={time_left_clock_icon} alt="time left" className="w-4 h-4 sm:w-5 sm:h-5" />
                <p><span className="font-semibold">5 Days</span> left at this price!</p>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold">{course.courseTitle}</h2>

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-black font-bold text-xl sm:text-2xl">
                  $ {(course.coursePrice - (course.coursePrice * course.discount) / 100).toFixed(2)}
                </p>
                <span className="line-through text-sm text-gray-500">
                  $ {course.coursePrice}
                </span>
                <span className="text-gray-500 font-semibold text-sm">
                  {course.discount}% OFF
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <img src={Math.floor(averageRating) ? star : star_blank} alt="star" className="w-4 h-4" />
                  <p>{averageRating}</p>
                </div>
                <span>|</span>
                <div className="flex items-center gap-1">
                  <img src={lesson_icon} alt="lessons" className="w-4 h-4" />
                  <p>{totalLectures} Lectures</p>
                </div>
                <span>|</span>
                <div className="flex items-center gap-1">
                  <img src={time_clock_icon} alt="duration" className="w-4 h-4" />
                  <p>{courseTime}</p>
                </div>
              </div>

              {/* Conditional buttons for enroll, cart and wishlist */}
              {isStudent ? (
                isEnrolled ? (
                  <button
                    onClick={() => nav(`/player/${courseId}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Continue Course
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleEnrollClick}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Enroll Now
                    </button>


                    <div className='flex gap-2 mt-2'>
                      {isInCart ? (
                        <button
                          onClick={handleCartClick}
                          className="bg-blue-500 flex-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          Go to Cart
                        </button>
                      ) : (
                        <button
                          onClick={handleCartClick}
                          className="bg-blue-500 flex-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          Add to Cart
                        </button>
                      )}
                      <button
                        onClick={handleWishListClick}
                        className={`rounded-full ${isInWishlist ? 'text-red-400 hover:text-black' : 'hover:text-red-400'} font-bold py-2 px-4 shadow-lg transition duration-300 ease-in-out transform`}
                      >
                        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                      </button>
                    </div>

                  </>
                )
              ) : (
                <button
                  onClick={() => nav("/auth/sign-in")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Sign In to Enroll
                </button>
              )}




              <div>
                <p className="text-gray-700 font-semibold text-lg sm:text-xl mb-2">What’s in the course?</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm sm:text-base">
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step, hands-on project guidance.</li>
                  <li>Downloadable resources and source code.</li>
                  <li>Quizzes to test your knowledge.</li>
                  <li>Certificate of completion.</li>
                  <li>Quizzes to test your knowledge.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        <div className="flex justify-center mt-10">
          <Link onClick={() => scrollTo(0, 0)} to={"/course-list"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'>
            Show all courses
          </Link>
        </div>

      </div>
    </div>
  )
}

export default CourseDetails



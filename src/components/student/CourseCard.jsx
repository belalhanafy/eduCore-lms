import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { assets } from '../../assets/images/assets'
import { AppContext } from '../../context/AppContext'
const { star, star_blank } = assets
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const CourseCard = ({ course }) => {

  const { getAverageRating, addToCart, addToWishList, wishList, allEducators, removeFromWishList, enrolledCourses, getUserEnrolledCourses, cart
    , isStudent, studentId
  } = useContext(AppContext)
  const navigate = useNavigate();
  
  const isEnrolled = enrolledCourses.some(item => item._id === course._id);
  const isInWishlist = wishList.some(item => item._id === course._id);
  const EducatorName = allEducators.find((educator) => educator._id === course?.educatorId).name;

  
  useEffect(() => {
    if (studentId) {
      getUserEnrolledCourses();
    }
  }, [studentId]);
  

  const handleWishClick = () => {
    if (!isStudent) {
      navigate("/auth/sign-in");
      return;
    }

    if (isInWishlist) {
      removeFromWishList(course);
    } else {
      addToWishList(course);
    }
  };

  const handleCartClick = () => {
    if (!isStudent) {
      navigate("/auth/sign-in");
      return;
    }
    addToCart(course);
  };


  const isInCart = (courseId) => {
    return cart.some(item => item._id === courseId);
  };
  return (
    <div key={course._id} className='bg-white shadow-md rounded-lg flex flex-col'>
      <Link to={`/course/${course._id}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center justify-center'>
        <img src={course.courseThumbnail} alt="Course Image" loading='lazy' className='w-full h-48 object-cover rounded-t-lg' />
      </Link>
      <div className='p-4 text-left'>
        <h2 className='text-lg font-bold'>{course.courseTitle}</h2>
        <p className='text-gray-600'>{EducatorName}</p>
        <div className='flex items-center gap-2'>
          <p className='text-gray-500'>{getAverageRating(course)}</p>
          <div className='flex'>
            {Array(5).fill(0).map((_, index) => (
              <img className="w-4 h-4" src={index < Math.floor(getAverageRating(course)) ? star : star_blank} key={index} />
            ))}

          </div>
          <p className='text-blue-500'>({course.courseRatings.length} rating)</p>
        </div>
        <div className="text-gray-800 font-semibold flex items-center">
          {(course.discount > 0 || course.discount) ? (

            <span className="line-through text-sm text-gray-500 mr-2">
              $ {course.coursePrice}
            </span>
          ) : (
            <span className="text-black font-bold">
              $ {course.coursePrice}
            </span>
          )
          }
          {course.discount > 0 &&
            <p className="text-black font-bold">
              $ {(course.coursePrice - (course.coursePrice * course.discount) / 100).toFixed(2)}
            </p>
          }
        </div>

        <div className='flex gap-2 mt-2'>
          {isStudent && isEnrolled ? (
            <button className='flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg cursor-auto'>
              Enrolled
            </button>
          ) : (
            <>
              {isInCart(course._id) ? (
                <button
                  onClick={() => navigate('/cart')}
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform"
                >
                  Go to Cart
                </button>
              ) : (
                <button
                  onClick={handleCartClick}
                  className='flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform'
                >
                  Add To Cart
                </button>
              )}

              <button
                onClick={handleWishClick}
                className={`rounded-full ${isInWishlist ? 'text-red-400 hover:text-black' : 'hover:text-red-400'} font-bold py-2 px-4 shadow-lg transition duration-300 ease-in-out transform`}
              >
                {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
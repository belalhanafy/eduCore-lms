import React, { useContext } from 'react'
import { dummyTestimonial } from '../../data';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/images/assets'
import Slider from 'react-slick';
const { star, star_blank, rightArrow } = assets
const TestimonialsSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true
  };
  const { getAverageRating } = useContext(AppContext)

  return (
    <div className='flex flex-col justify-center mt-10 items-center'>
      <h2 className='text-3xl font-semibold'>Learn from the best</h2>
      <p className='text-gray-500 max-w-2xl mx-auto'>Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.</p>
      <div className='w-full mt-10 max-w-7xl mx-auto px-4'>
        <Slider className='mx-10' {...settings}>
          {dummyTestimonial.map((testimonial, index) => (
            <div key={index} className='px-2'>
              <div className='bg-white rounded-md shadow-md px-1 pt-1'>
                <div className='bg-gray-200 flex items-center p-3 rounded-t-md mb-3'>
                  <img src={testimonial.image} alt={testimonial.name} className='w-12 h-12 rounded-full mr-3' />
                  <div className='flex flex-col gap-1 items-start'>
                    <h3 className='text-lg font-semibold'>{testimonial.name}</h3>
                    <p className='text-gray-800 font-semibold'>{testimonial.role}</p>
                  </div>
                </div>
                <div className='p-5 flex flex-col items-start'>
                  <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <img className="w-4 h-4" key={i} src={i < Math.floor(getAverageRating(testimonial)) ? star : star_blank} alt="Star" />
                    ))}
                  </div>
                  <p className='text-gray-500 mt-4 mb-8 text-left'>{testimonial.feedback}</p>
                  <a
                    href="#"
                    className="group inline-flex items-center text-blue-500 transition-all duration-300 hover:underline hover:text-blue-700"
                  >
                    <span> Read More</span>
                    <img src={rightArrow} className="w-4 h-4 mt-1 transition-transform duration-300 text-blue-500 transform group-hover:translate-x-1" loading='lazy' alt="Arrow Right" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default TestimonialsSection
import React from 'react';
import Slider from 'react-slick';
import { assets } from '../../assets/images/assets';

const { edu1, edu2, edu3, edu4, edu5 } = assets;

const testimonials = [
  {
    image: edu1,
    quote: "Teaching on EduCore has provided me with two important elements: the opportunity to reach more learners than I ever would be able to on my own and a steady stream of extra income.",
    name: "Deborah Grayson Riege",
    specialty: "Leadership, Communication",
  },
  {
    image: edu2,
    quote: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    name: "James Washington",
    specialty: "SWE 2 @ Google",
  },
  {
    image: edu3,
    quote: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    name: "Richard Nelson",
    specialty: "SWE 2 @ Samsung",
  },
  {
    image: edu4,
    quote: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    name: "Donald Jackman",
    specialty: "SWE 1 @ Amazon",
  },
  {
    image: edu5,
    quote: "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    name: "James Washington",
    specialty: "SWE 2 @ Google",
  },
];

const EduTestimonialsSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768, // screens below 768px
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-8 gap-8">
                <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded-md mx-auto md:mx-0" />
                <div className="text-center md:text-left">
                  <p className="text-lg text-gray-700 italic mb-4">“{item.quote}”</p>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-gray-500">{item.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// Custom Arrow Components
const CustomNextArrow = (props) => {
  const { className, onClick, style } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <style jsx>{`
        .slick-next::before {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick, style } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <style jsx>{`
        .slick-prev::before {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default EduTestimonialsSlider;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router'; // optional if you want button to navigate
import WhyTeachSection from '../../components/educator/WhyTeachSection';
import EduTestimonialsSlider from '../../components/educator/EduTestimonialsSlider';
import { AppContext } from '../../context/AppContext';

const EduHome = () => {
  
  const { isEducator } = useContext(AppContext);
  
  const navigate = useNavigate();
  const handleStartTeaching = async () => {
    navigate('/auth/eduSign-in');
  };


  return (<>
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
        alt="Educator Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Empower the Next Generation
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-8">
          Share your knowledge, create impactful courses, and inspire thousands of students around the world.
        </p>
        {!isEducator ? (
          <button
            onClick={handleStartTeaching}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition transform hover:scale-105"
          >
            Start Teaching
          </button>
        ) : (
          <button
            onClick={() => navigate('/educator')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition transform hover:scale-105"
          >
            educator Dashboard
          </button>
        )}
      </div>
      <button onClick={() => {
        const whyTeachSection = document.getElementById('whyTeachSection');
        if (whyTeachSection) {
          whyTeachSection.scrollIntoView({ behavior: 'smooth' });
        }
      }} className="cursor-pointer z-50 absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 px-3 py-2 mt-8 rounded-md text-white tracking-wider shadow-xl animate-bounce"
      >
        <svg className="w-5 h-5" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </button>
    </div>


    <div id='whyTeachSection'>
      <WhyTeachSection />
    </div>

    <div>
      <EduTestimonialsSlider />
    </div>


    {!isEducator && (
      <section className="bg-blue-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Become an instructor today
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Join one of the world’s largest online learning marketplaces.
          </p>
          <button onClick={handleStartTeaching} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105'>
            Get Started Now
          </button>
        </div>
      </section>
    )}
  </>
  );
};

export default EduHome;

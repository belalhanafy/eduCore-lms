import React from 'react';
import { useNavigate } from 'react-router';
import { assets } from '../assets/images/assets';
const { notfound } = assets;
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <img
        src={notfound}
        alt="404 Not Found"
        className="w-full max-w-2xl rounded-lg"
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;

import React, { useEffect, useState } from 'react'

const Rating = ({initialRating, onRate}) => {
  const [rating, setRating] = useState(initialRating || 0); // Set initial rating to 0 or any other value you want

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onRate) {
      onRate(newRating); // Call the onRate callback if provided
    }
  }

  useEffect(() => {
    // This effect runs when the initialRating prop changes
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating])

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        // Assuming index is 0-based, so starValue will be 1 to 5
        // If you want to use starValue, you can uncomment the line below
        const starValue = index + 1;
        return (
          <span key={index} className={`inline-block text-xl sm:text-2xl cursor-pointer transition-all duration-300 hover:scale-110 ${starValue <= rating ? 'text-yellow-500' : 'text-gray-300'}`} onClick={() => handleRatingChange(starValue)}>
            &#9733; {/* Unicode for star character */}
          </span>
        )
      })}
    </div>
  )
}

export default Rating
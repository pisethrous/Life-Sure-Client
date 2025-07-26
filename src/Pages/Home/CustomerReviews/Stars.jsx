import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const Stars = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex gap-1 mt-2">
      {[...Array(totalStars)].map((_, i) => {
        if (i < fullStars) {
          return <FaStar key={i} className="text-yellow-400" />;
        } else if (i === fullStars && hasHalfStar) {
          return <FaStarHalfAlt key={i} className="text-yellow-400" />;
        } else {
          return <FaRegStar key={i} className="text-yellow-400" />;
        }
      })}
    </div>
  );
};

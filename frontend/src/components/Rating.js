import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
      <span>
        {[1, 2, 3, 4, 5].map((ratingNumber, index) => (
          <i
            style={{ color: "#000000" }}
            key={index}
            className={
              value >= ratingNumber
                ? "fas fa-star fa-xs"
                : value >= ratingNumber - 0.5
                ? "fas fa-star-half-alt fa-xs"
                : "far fa-star fa-xs"
            }
          ></i>
        ))}
      </span>
      <span>{text && text}</span>
    </div>
  );
};

// Rating.propTypes = {
//   value: PropTypes.number.isRequired,
//   text: PropTypes.string.isRequired,
// };

export default Rating;

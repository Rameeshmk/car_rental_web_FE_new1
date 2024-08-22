import React, { useState } from 'react';
import UserReviewForm from "../components/userreview/UserReviewForm"

const UserReviewPg = () => {
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmitted = (review) => {
    setReviews((prevReviews) => [review, ...prevReviews]);
  };

  return (
    <div>
      <UserReviewForm onReviewSubmitted={handleReviewSubmitted} />
      {/* Render reviews or other components here */}
    </div>
  );
};

export default UserReviewPg;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';

const UserReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance({
          url: '/user/reviews', 
          method: 'GET', 
        });
        setReviews(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]); 
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold text-center mb-8">CONNECT WITH US</h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
     
      {reviews.length > 0 ?   (
        reviews.map((review) => (
          
          <div key={review._id} className="flex flex-wrap justify-center  gap-8">
              
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs flex items-start space-x-4">
              
              <div >
                <p className="text-lg mb-2">{review.comment}</p>
                <p className="font-semibold">- {review.username}{review.lname}</p>
                <p className="text-sm text-gray-600">Rating: {review.rating}</p>
              </div>
            </div>


          
            <hr className="my-4 border-gray-300" />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
      </div>
      </div>
      </section>
    </div>
  );
};

export default UserReviewList;

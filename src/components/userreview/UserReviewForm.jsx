{/*import { useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';

const UserReviewForm = ({ onReviewSubmitted }) => {
  const [username, setUsername] = useState();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

const userId= localStorage.getItem('userId');


const fetchUser = async () => {
  try {
    if (!userId) {
      throw new Error('User not logged in');
    }
    const res= await axiosInstance({
      url:`/user/get-user/${userId}`,
    method:"GET",
    });
   const user= res.data
   const name= user.firstName;
  }
  setUsername(name);
},

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { username, rating, comment };

    try {
      const response = await axiosInstance({
        url: '/user/reviews',          
        method: 'POST',                
        data: review,                  
        headers: { 'Content-Type': 'application/json' }, 
      });
      onReviewSubmitted(response.data);
      setUsername('');
      setRating(1);
      setComment('');
      setIsFormVisible(false); // Hide the form after submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6  bg-white shadow-md rounded-lg">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
      >
        {isFormVisible ? 'Cancel' : 'Write a Review'}
      </button>
      {isFormVisible && (
        <>
          <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                required
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
                className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Review</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your review"
                required
                rows="4"
                className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Review
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UserReviewForm;*/}

import { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';

const UserReviewForm = ({ onReviewSubmitted }) => {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) {
          throw new Error('User not logged in');
        }
        const res = await axiosInstance.get(`/user/get-user/${userId}`);
        const name = res.data.firstName; // Assuming the user's first name is returned
        setUsername(name); // Set the username state
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { username, rating, comment };

    try {
      const response = await axiosInstance.post('/user/reviews', review, {
        headers: { 'Content-Type': 'application/json' },
      });
      onReviewSubmitted(response.data);
      setUsername(username); // Keep the username as is after submission
      setRating(1);
      setComment('');
      setIsFormVisible(false); // Hide the form after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
      >
        {isFormVisible ? 'Cancel' : 'Write a Review'}
      </button>
      {isFormVisible && (
        <>
          <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                required
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
                className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Review</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your review"
                required
                rows="4"
                className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Review
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UserReviewForm;


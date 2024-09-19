{/*import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

const UserReviewForm = ({ onReviewSubmitted }) => {
  const [username, setUsername] = useState('');
  const [lname, setLname] = useState('');
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
        const name = res.data.firstName;
        const lastName = res.data.lastName;
        setUsername(name);
        setLname(lastName);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { username, lname, rating, comment };

    try {
      const response = await axiosInstance.post('/user/reviews', review, {
        headers: { 'Content-Type': 'application/json' },
      });
      onReviewSubmitted(response.data);

      // Show success alert
      window.alert('Successfully submitted the review!');

      // Clear the inputs
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
                value={`${username} ${lname}`} // Combine username and last name
                readOnly // Set input to read-only
                placeholder={`${username} ${lname}`}  // Combine username and last name for placeholder
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
import { axiosInstance } from '../../config/axiosInstance';

const UserReviewForm = ({ onReviewSubmitted }) => {
  const [username, setUsername] = useState('');
  const [lname, setLname] = useState('');
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
        const name = res.data.firstName;
        const lastName = res.data.lastName;
        setUsername(name);
        setLname(lastName);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { username, lname, rating, comment };

    try {
      const response = await axiosInstance.post('/user/reviews', review, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Show success alert
      window.alert('Successfully submitted the review!');

      // Clear the inputs
      setRating(1);
      setComment('');
      setIsFormVisible(false); // Hide the form after submission

      // Notify parent component about the new review
      onReviewSubmitted(response.data);
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
                value={`${username} ${lname}`} // Combine username and last name
                readOnly // Set input to read-only
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







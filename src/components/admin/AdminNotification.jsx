import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance({
            url:'/dealer/notifications',
        method:"GET"
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleApproval = async (dealerId) => {
    try {
      await axiosInstance({
        url:`/dealer/approve-dealer/${dealerId}`,
        method:"POST",
    });
      setNotifications(notifications.filter(notification => notification.dealerId !== dealerId));
    } catch (error) {
      console.error("Error approving dealer", error);
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/2016/08/1080p-Car-Wallpaper-Download-Free.jpg')" }}>
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 p-4">
        <h1 className="text-3xl font-bold text-white mb-8">Notifications</h1>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          {notifications.length === 0 ? (
            <p className="text-gray-700">No notifications at this time.</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.dealerId} className="mb-4 p-4 border rounded-lg">
                <p>{notification.message}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleApproval(notification.dealerId)}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => console.log('Reject functionality not implemented yet')}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

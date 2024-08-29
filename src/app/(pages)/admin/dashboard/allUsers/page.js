"use client"; // This line is necessary for client-side components in Next.js

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/auth/get-user-ids');
        const data = await response.json();
        setUserDetails(data.userDetails);
      } catch (error) {
        console.error('Failed to fetch user details', error);
        toast.error('Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await fetch('/api/auth/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUserId,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully!');
      } else {
        toast.error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message', error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">User Details:</h3>
        <motion.select
          id="userSelect"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <option value="">Select User</option>
          {userDetails.map(({ id, name, email }) => (
            <option key={id} value={id}>
              {name} ({email})
            </option>
          ))}
        </motion.select>
      </div>

      {selectedUserId && (
        <div className="mb-4">
          <label htmlFor="message" className="block font-semibold mb-2">
            Message:
          </label>
          <textarea
            id="message"
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <motion.button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            disabled={!message}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

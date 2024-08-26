"use client"; // This line is necessary for client-side components in Next.js

import { useEffect, useState } from 'react';

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
        alert(result.success);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">User Details:</h3>
        <ul className="list-disc pl-5">
          {userDetails.map(({ id, name, email }) => (
            <li key={id} className="mb-2">
              <div className="flex justify-between">
                <span>{name} ({email})</span>
                <button
                  onClick={() => setSelectedUserId(id)}
                  className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Select
                </button>
              </div>
            </li>
          ))}
        </ul>
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
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            disabled={!message}
          >
            Send Message
          </button>
        </div>
      )}
    </div>
  );
}

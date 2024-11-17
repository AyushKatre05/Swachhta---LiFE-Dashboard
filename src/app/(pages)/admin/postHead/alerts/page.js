'use client';

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function AdminSendAlertPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [area, setArea] = useState(''); // New state for area
  const [details, setDetails] = useState(''); // New state for details

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/auth/get-user-ids', {
          method: 'GET',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.userDetails); // Use `userDetails` from API response
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error(error.message || 'An error occurred while fetching users.');
      }
    };

    fetchUsers();
  }, []);

  // Handle sending the alert
  const handleSendAlert = async () => {
    if (!selectedUser || !message || !area || !details) {
      toast.error('Please fill all fields before sending the alert.');
      return;
    }

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignedTo: selectedUser, message, area, details }), // Include area and details
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Alert sent successfully!');
        setMessage('');
        setArea(''); // Reset area
        setDetails(''); // Reset details
        setSelectedUser('');
      } else {
        toast.error(data.error || 'Failed to send alert');
      }
    } catch (error) {
      console.error('Error sending alert:', error);
      toast.error('An error occurred while sending the alert.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <motion.div
        className="p-8 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white text-center shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-2">Divisional Office</h1>
        <p className="text-lg text-blue-100 dark:text-gray-400">Send alerts to the users.</p>
      </motion.div>

      <div className="flex flex-1">
        <main className="flex-1 p-4 space-y-12">
          <motion.section
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send an Alert</h2>

            <div className="space-y-4">
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Select User</option>
                {users.map(({ id, name, email }) => (
                  <option key={id} value={id}>
                    {name} ({email})
                  </option>
                ))}
              </select>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600"
                placeholder="Type your alert message here..."
                rows="4"
              />

              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter area..."
              />

              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter details..."
                rows="4"
              />

              <Button
                onClick={handleSendAlert}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                disabled={!message || !area || !details || !selectedUser}
              >
                Send Alert
              </Button>
            </div>
          </motion.section>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}

export default AdminSendAlertPage;

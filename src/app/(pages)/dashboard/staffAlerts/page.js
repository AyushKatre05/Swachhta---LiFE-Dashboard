'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StaffAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = "current_user_id"; // Replace with actual logged-in user ID

  // Fetch alerts for the logged-in user
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(`/api/alerts?assignedTo=${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setAlerts(data.alerts);
        } else {
          console.error("Failed to fetch alerts:", data.error);
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [userId]);

  const resolveAlert = async (alertId) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}/resolve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success) {
        // Update the alert status locally
        setAlerts(prevAlerts =>
          prevAlerts.map(alert =>
            alert._id === alertId ? { ...alert, status: 'Resolved' } : alert
          )
        );
      } else {
        console.error("Failed to resolve alert:", data.error);
      }
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center min-h-screen"
      >
        <p className="text-xl text-gray-600">Loading alerts...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-8 bg-gray-50 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">My Alerts</h1>

      <motion.div
        className="overflow-x-auto rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        {alerts.length > 0 ? (
          <motion.table
            className="min-w-full bg-white shadow-md rounded-lg border border-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-left">Area</th>
                <th className="py-3 px-4 text-left">Issued Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <motion.tr
                  key={alert._id}
                  className="border-b hover:bg-indigo-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  <td className="py-3 px-4">{alert.message}</td>
                  <td className="py-3 px-4">{alert.area}</td>
                  <td className="py-3 px-4">{new Date(alert.issuedDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        alert.status === 'Pending'
                          ? 'bg-yellow-500'
                          : alert.status === 'In Progress'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {alert.status === 'Pending' && (
                      <button
                        onClick={() => resolveAlert(alert._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-center text-gray-600 py-10"
          >
            <p>No alerts assigned to you.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";

function PostOfficeHeadDashboard() {
  const router = useRouter();
  const [alerts, setAlerts] = useState([
    { id: 1, title: "Waste Disposal Issue", status: "Pending", date: "2024-09-01" },
    { id: 2, title: "Broken Bin Lid", status: "Resolved", date: "2024-09-02" },
  ]);

  const [userDetails, setUserDetails] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/auth/get-user-ids");
        const data = await response.json();
        setUserDetails(data.userDetails);
      } catch (error) {
        console.error("Failed to fetch user details", error);
        toast.error("Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await fetch("/api/auth/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUserId,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        setMessage("");
        setSelectedUserId("");
      } else {
        toast.error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header Section */}
      <motion.div
        className="p-8 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white text-center shadow-lg flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h1 className="text-4xl font-bold mb-1">Welcome, Post Office Head</h1>
          <p className="text-lg text-blue-100 dark:text-gray-400">
            Manage Swachhta, compliance, and staff effortlessly.
          </p>
        </div>
        <ModeToggle />
      </motion.div>

      <div className="flex flex-1">
        <main className="flex-1 p-4 space-y-12">
          {/* Overview Section */}
          <motion.section
            id="overview"
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Compliance</h3>
                <p className="text-gray-600 dark:text-gray-300">80% Completed</p>
              </motion.div>
              <Link href={"/admin/postHead/alerts"}>
              <motion.div
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Alerts</h3>
                <p className="text-gray-600 dark:text-gray-300">5 Active Alerts</p>
              </motion.div>
              </Link>
              <Link href={"/admin/postHead/reportsPage"}>
              <motion.div
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Reports</h3>
                <p className="text-gray-600 dark:text-gray-300">10 Pending Reports</p>
              </motion.div>
              </Link>
            </div>
          </motion.section>

          {/* Alerts Management */}
          <motion.section
            className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Send Alert Message</h2>
            <div className="space-y-4">
              <motion.select
                id="userSelect"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600"
                whileHover={{ scale: 1.02 }}
              >
                <option value="">Select User</option>
                {userDetails.map(({ id, name, email }) => (
                  <option key={id} value={id}>
                    {name} ({email})
                  </option>
                ))}
              </motion.select>

              {selectedUserId && (
                <div className="space-y-2">
                  <textarea
                    id="message"
                    placeholder="Type your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600"
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
            </div>
          </motion.section>

          {/* Report Management */}
          <motion.section
            id="report-management"
            className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Report Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Pending Reports</h3>
                <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Missing Waste Bin</li>
                  <li>• Late Compliance Submission</li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Resolved Reports</h3>
                <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Broken Bin Replaced</li>
                  <li>• Overdue Submission Cleared</li>
                </ul>
              </motion.div>
            </div>
          </motion.section>

          <ToastContainer />
        </main>
      </div>
    </div>
  );
}

export default PostOfficeHeadDashboard;

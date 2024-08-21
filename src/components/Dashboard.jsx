"use client";

import React from "react";
import { motion } from "framer-motion";
import SignoutButton from "./signoutButton";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/modeToggle";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900"
    >
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-900 text-white p-6 flex justify-between items-center shadow-md dark:bg-blue-800"
      >
        <h1 className="text-4xl font-bold">Swachhta & LiFE Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Link href={'/admin/login'}><UserCircle2/></Link>
          <ModeToggle />
          <SignoutButton />
        </div>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 flex flex-col md:flex-row gap-6"
      >
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-green-800 dark:text-white">
              <h3 className="text-xl font-semibold">Cleanliness Status</h3>
              <p>Current status of cleanliness across different areas.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-blue-800 dark:text-white">
              <h3 className="text-xl font-semibold">Green Practices</h3>
              <p>Information on ongoing green practices and initiatives.</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-yellow-800 dark:text-white">
              <h3 className="text-xl font-semibold">Alerts</h3>
              <p>Recent alerts and notifications regarding cleanliness.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 flex flex-col gap-6 md:flex-row"
      >
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Monitoring Panel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md flex-1 transition-transform transform hover:scale-105 dark:bg-gray-700 dark:text-white">
              <h3 className="text-xl font-semibold">Image Processing Results</h3>
              <p>Insights and results from image processing operations.</p>
            </div>
            <div className="bg-gray-300 p-6 rounded-lg shadow-md flex-1 transition-transform transform hover:scale-105 dark:bg-gray-600 dark:text-white">
              <h3 className="text-xl font-semibold">Recent Alerts</h3>
              <p>List of recent alerts and their details.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Actions</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <Button className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex-1 transition-transform transform hover:scale-105 dark:bg-blue-700">
            Generate Report
          </Button>
          <Button className="bg-blue-700 text-white p-4 rounded-lg shadow-md flex-1 transition-transform transform hover:scale-105 dark:bg-blue-800">
            Review Alerts
          </Button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex-1 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-semibold">Daily Statistics</h3>
            <p>Overview of daily statistics and metrics.</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex-1 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <h3 className="text-xl font-semibold">Monthly Trends</h3>
            <p>Trends and patterns observed over the month.</p>
          </div>
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-900 text-white text-center p-4 mt-auto shadow-inner dark:bg-blue-800"
      >
        <p>&copy; 2024 Swachhta & LiFE Dashboard</p>
      </motion.footer>
    </motion.div>
  );
}

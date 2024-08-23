"use client"
import React from "react";
import { motion } from "framer-motion";

export default function OverviewSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 md:gap-6"
    >
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
          Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <div className="bg-green-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-green-800 dark:text-white">
            <h3 className="text-lg md:text-xl font-semibold">Cleanliness Status</h3>
            <p>Current status of cleanliness across different areas.</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-blue-800 dark:text-white">
            <h3 className="text-lg md:text-xl font-semibold">Green Practices</h3>
            <p>Information on ongoing green practices and initiatives.</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 dark:bg-yellow-800 dark:text-white">
            <h3 className="text-lg md:text-xl font-semibold">Alerts</h3>
            <p>Recent alerts and notifications regarding cleanliness.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

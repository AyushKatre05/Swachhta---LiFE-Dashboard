"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, LineChart, PieChart } from 'lucide-react';

export default function Statistics() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white p-6 shadow-md dark:bg-gray-800"
      >
        <h1 className="text-2xl font-bold">Swachhta & LiFE Statistics</h1>
      </motion.header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-4 space-y-6"
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-blue-800 dark:text-white"
          >
            <div className="flex items-center space-x-3">
              <BarChart2 className="text-blue-500" />
              <h3 className="text-xl font-semibold">Cleanliness Metrics</h3>
            </div>
            <p className="mt-2">Overview of cleanliness metrics for all post offices.</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-green-800 dark:text-white"
          >
            <div className="flex items-center space-x-3">
              <LineChart className="text-green-500" />
              <h3 className="text-xl font-semibold">Green Practices Trends</h3>
            </div>
            <p className="mt-2">Analysis of the adoption of green practices over time.</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-yellow-800 dark:text-white"
          >
            <div className="flex items-center space-x-3">
              <PieChart className="text-yellow-500" />
              <h3 className="text-xl font-semibold">Alert Distribution</h3>
            </div>
            <p className="mt-2">Breakdown of alerts by type and severity.</p>
          </motion.div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-white">
          <h3 className="text-xl font-semibold mb-4">Monthly Trends</h3>
          <p>Visualization of the monthly trends in cleanliness and green practices across all post offices.</p>
        </section>
      </motion.main>
    </div>
  );
}

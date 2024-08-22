"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Alerts() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white p-6 shadow-md dark:bg-gray-800"
      >
        <h1 className="text-2xl font-bold">Swachhta & LiFE Alerts</h1>
      </motion.header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-4 space-y-6"
      >
        <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-white">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="text-yellow-500" />
            <h3 className="text-xl font-semibold">Deviations in Cleanliness Standards</h3>
          </div>
          <p className="mt-2">
            Anomalies detected in cleanliness practices at the XYZ Post Office. Immediate action required to maintain Swachhta standards.
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400">5 minutes ago</span>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-white">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-500" />
            <h3 className="text-xl font-semibold">Green Practices Confirmed</h3>
          </div>
          <p className="mt-2">
            The Green Growth standards have been successfully implemented at ABC Post Office.
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400">30 minutes ago</span>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-white">
          <div className="flex items-center space-x-3">
            <Clock className="text-blue-500" />
            <h3 className="text-xl font-semibold">Pending Review</h3>
          </div>
          <p className="mt-2">
            Awaiting review for the cleanliness inspection report of LMN Post Office. Please complete the review process.
          </p>
          <span className="text-sm text-gray-500 dark:text-gray-400">1 hour ago</span>
        </section>
      </motion.main>
    </div>
  );
}

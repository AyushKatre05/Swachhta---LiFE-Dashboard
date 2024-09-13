"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StatisticsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 flex flex-col gap-4 md:gap-6"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">Statistics</h2>
      
      {/* Section 1: Daily Statistics and Monthly Trends */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <Link href='/dashboard/analytics/image'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg flex-1 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <h3 className="text-lg md:text-xl font-semibold">Image Statistics</h3>
          <p>Overview of image statistics and metrics.</p>
        </motion.div>
        </Link>
        <Link href={'/dashboard/analytics/video'}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-200 p-4 md:p-6 rounded-lg shadow-lg flex-1 border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
        >
          <h3 className="text-lg md:text-xl font-semibold">Video Statistics</h3>
          <p>Overview of image statistics and metrics.</p>
        </motion.div>
        </Link>
      </div>

      {/* Section 2: Yearly Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-2">Yearly Overview</h3>
        <p>
          A comprehensive overview of annual statistics and key performance indicators.
        </p>
      </motion.div>

      {/* Section 3: Custom Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 bg-gray-200 p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-2">Custom Analytics</h3>
        <p>
          Customizable analytics to fit specific needs and preferences.
        </p>
      </motion.div>
    </motion.section>
  );
}

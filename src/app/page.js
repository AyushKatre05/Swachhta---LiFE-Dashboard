"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/modeToggle';
import CursorTrail from '@/components/CursorTrail'; // Ensure the path is correct

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Cursor Trail */}
      <CursorTrail color="hsla(200, 100%, 50%, 0.7)" />

      {/* Header Section */}
      <header className="w-full flex justify-between items-center px-8 py-6 bg-blue-600 dark:bg-gray-900 text-white">
        <h1 className="text-3xl font-bold">Swachhta & LiFE Dashboard</h1>
        <div className="flex space-x-4">
          <ModeToggle />
          <Link href={'/login'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-20">
        <motion.h1
          className="text-5xl font-extrabold text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Revolutionizing Cleanliness & Green Practices
        </motion.h1>
        <motion.p
          className="text-lg mt-4 text-center max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          Harnessing AI-powered image processing technology to monitor, alert, and guide post offices in maintaining Swachhta and LiFE standards.
        </motion.p>
        <motion.div
          className="mt-8 flex space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
        >
          <Link href={'/login'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </motion.button>
          </Link>
          <Link href={'/features'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-4xl font-bold mb-8">Key Features</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              className="w-full md:w-1/3 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-4">AI Monitoring</h3>
              <p className="text-lg">Advanced AI technology to continuously monitor cleanliness and green practices across post offices.</p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/3 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Real-time Alerts</h3>
              <p className="text-lg">Instant alerts for deviations from standards to ensure timely intervention and corrective actions.</p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/3 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Surveillance Capabilities</h3>
              <p className="text-lg">Comprehensive surveillance tools for divisional offices to oversee and guide post office practices effectively.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-4xl font-bold mb-8">About the Dashboard</h2>
          <p className="text-lg leading-relaxed">
            The Swachhta & LiFE Dashboard is a state-of-the-art platform designed to uphold the highest standards of cleanliness and green practices in post offices. By leveraging AI technology, it ensures effective real-time monitoring and management, generating alerts for any deviations to ensure that corrective measures are implemented promptly, thus maintaining an optimal environment across all facilities.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg mb-4">
            Have questions or need more information? Feel free to reach out to us.
          </p>
          <Link href={'/contact'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Contact Support
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-6 bg-blue-600 dark:bg-gray-900 text-center text-white">
        <p className="text-sm">&copy; 2024 Swachhta & LiFE Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

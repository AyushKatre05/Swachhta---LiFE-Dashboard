"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/modeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <header className="w-full flex justify-between items-center px-8 py-6 bg-gray-100 dark:bg-gray-900">
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
      <section className="relative w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-20">
        <motion.h1 
          className="text-5xl font-extrabold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Transforming Cleanliness & Green Practices
        </motion.h1>
        <motion.p 
          className="text-lg mt-4 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          Integrating AI-powered image processing technology to monitor and maintain Swachhta & LiFE practices across post offices.
        </motion.p>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-black text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-4xl font-bold mb-8">About the Dashboard</h2>
          <p className="text-lg leading-relaxed">
            The Swachhta & LiFE Dashboard is an innovative platform designed to ensure the highest standards of cleanliness and green practices in post offices. It uses cutting-edge AI technology to provide real-time monitoring, generate alerts for deviations, and guide corrective actions. This tool empowers divisional offices to maintain a clean and green environment, ensuring that all post offices conform to the prescribed Swachhta and Green Growth standards.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-200 dark:bg-gray-800 text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-4xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="p-6 bg-white dark:bg-black rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Real-time Monitoring</h3>
              <p>AI-powered image processing to track cleanliness in real-time.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-white dark:bg-black rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Automated Alerts</h3>
              <p>Get instant notifications for deviations from the set standards.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-white dark:bg-black rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Comprehensive Reports</h3>
              <p>Detailed reports for each post office to track progress and issues.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-white dark:bg-black rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Corrective Actions</h3>
              <p>Guidance for on-ground interventions to ensure compliance.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-white dark:bg-black text-center">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-4xl font-bold mb-8">Join Us in Making a Difference</h2>
          <p className="text-lg mb-6">
            Become a part of the Swachhta & LiFE initiative and help us ensure that every post office maintains the highest standards of cleanliness and green practices.
          </p>
          <Link href={'/register'}>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 bg-gray-200 dark:bg-gray-700 text-center">
        <p>&copy; 2024 Swachhta & LiFE Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

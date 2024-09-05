"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/modeToggle";
import CursorTrail from "@/components/CursorTrail";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-200 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Cursor Trail */}
      <CursorTrail />

      {/* Header Section */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-green-600 dark:bg-gray-900 text-white shadow-md">
        <h1 className="text-2xl font-bold sm:text-3xl">Swachh Bharat</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-700 dark:bg-green-500 text-white rounded-md hover:bg-green-800 dark:hover:bg-green-600 transition"
            >
              Login
            </motion.button>
          </Link>
          <Link href="/admin">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-700 dark:bg-green-500 text-white rounded-md hover:bg-green-800 dark:hover:bg-green-600 transition"
            >
              Admin
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-16 px-6">
        <motion.h1
          className="text-4xl font-extrabold text-center sm:text-5xl text-green-800 dark:text-green-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Join the Movement for a Cleaner India
        </motion.h1>
        <motion.p
          className="text-lg mt-4 text-center max-w-3xl text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          Empowering communities through AI-driven monitoring to uphold cleanliness and hygiene across the nation.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
        >
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
            >
              Get Started
            </motion.button>
          </Link>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border-2 border-green-700 text-green-700 rounded-md hover:bg-green-700 hover:text-white transition"
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800 text-center">
        <motion.div
          className="max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 sm:text-4xl text-green-800 dark:text-green-400">
            Key Features
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                title: "AI Monitoring",
                description:
                  "Advanced AI technology to continuously monitor cleanliness and green practices across the nation.",
              },
              {
                title: "Real-time Alerts",
                description:
                  "Instant alerts for deviations from standards to ensure timely intervention and corrective actions.",
              },
              {
                title: "Community Engagement",
                description:
                  "Empowering citizens to actively participate in the Swachh Bharat Mission through real-time feedback and involvement.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="w-full md:w-1/3 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-300">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 text-center">
        <motion.div
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 sm:text-4xl text-green-800 dark:text-green-400">
            About the Dashboard
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            The Swachh Bharat Dashboard is a cutting-edge platform designed to uphold the highest standards of cleanliness across India. Through AI-driven technology, it ensures effective real-time monitoring, generates alerts for any deviations, and empowers communities to actively participate in maintaining a clean and hygienic environment.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800 text-center">
        <motion.div
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 sm:text-4xl text-green-800 dark:text-green-400">
            Contact Us
          </h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Have questions or need more information? Feel free to reach out to us.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
            >
              Contact Support
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-6 bg-green-600 dark:bg-gray-900 text-center text-white">
        <p className="text-sm">
          &copy; 2024 Swachh Bharat. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

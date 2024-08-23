// components/Header.jsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './ui/modeToggle';
import SignoutButton from './signoutButton';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-900 text-white p-6 flex justify-between items-center shadow-md dark:bg-blue-800"
    >
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
        <h1 className="text-4xl font-bold">Swachhta & LiFE Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
      </div>
    </motion.header>
  );
};

export default Header;

import React from "react";
import Link from "next/link";
import { X, Home, Bell, BarChart, LogOut, User } from "lucide-react";
import SignoutButton from "@/components/signoutButton";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`fixed top-0 left-0 z-30 bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-100 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:relative md:w-64 transition-transform duration-300 ease-in-out overflow-y-auto h-screen md:h-auto`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 dark:bg-gray-800 md:justify-center">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={toggleSidebar} className="text-white dark:text-gray-300 md:hidden p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1">
        <ul className="space-y-2 px-2">
          <li>
            <Link href="/" className="flex items-center px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-md">
              <Home className="w-5 h-5 mr-3" /> Home
            </Link>
          </li>
          <li>
            <Link href="/alert" className="flex items-center px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-md">
              <Bell className="w-5 h-5 mr-3" /> Alerts
            </Link>
          </li>
          <li>
            <Link href="/statistics" className="flex items-center px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-md">
              <BarChart className="w-5 h-5 mr-3" /> Statistics
            </Link>
          </li>
          <li>
            <Link href="/admin" className="flex items-center px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-md">
              <User className="w-5 h-5 mr-3" /> Admin
            </Link>
          </li>
          <li>
              <SignoutButton/> 
          </li>
        </ul>
      </nav>
    </div>
  );
}
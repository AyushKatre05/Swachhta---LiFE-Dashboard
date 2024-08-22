"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./ui/modeToggle";
import { User2Icon, Home, X, AlertCircle, BarChart } from "lucide-react";
import SignoutButton from "./signoutButton";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <aside
    className={`fixed inset-y-0 left-0 w-64 bg-gray-900 dark:bg-gray-800 text-white shadow-lg transition-transform duration-300 transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0`}
    style={{ zIndex: 1000 }}
  >
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Home className="w-6 h-6 mr-2" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/alert"
              className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              <AlertCircle className="w-6 h-6 mr-2" />
              <span>Alerts</span>
            </Link>
          </li>
          <li>
            <Link
              href="/statistics"
              className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              <BarChart className="w-6 h-6 mr-2" />
              <span>Statistics</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 mt-auto">
      <Link
          href="/admin/login"
          className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          <User2Icon className="w-6 h-6 mr-2" />
          <span>Admin</span>
        </Link>
        <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-700 transition-colors">
          <SignoutButton className="w-6 h-6 mr-2"/>
          <span>Logout</span>
          </div> 
      </div>
    </div>
  </aside>
);

export default Sidebar;

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function AdminDashboard() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow p-8 space-y-8">
        {/* Welcome Section */}
        <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Welcome, Admin!
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Use this dashboard to manage Swachhta and LiFE practices across post offices.
          </p>
        </section>

        {/* Dashboard Overview Section */}
        <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Dashboard Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            This section can be expanded with charts, reports, and other admin tools.
          </p>
        </section>

        {/* Alert Button Section */}
        <section className="flex justify-center gap-3">
          <Link href='/admin'>
            <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Back
            </Button>
          </Link>
          <Link href={'/admin/dashboard/allUsers'}>
            <Button className="bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Send Alert Message
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}

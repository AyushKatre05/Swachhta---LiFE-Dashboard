import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SignoutButton from "@/components/signoutButton";
import { getServerSession } from "next-auth";

import React from "react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Swachhta & LiFE Admin Dashboard
          </h1>
          <SignoutButton type="Admin" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-10 space-y-6">
        {/* Welcome Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Welcome, Admin!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use this dashboard to manage Swachhta and LiFE practices across post offices.
          </p>
        </section>

        {/* Session Info Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Your Session Information
          </h2>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm text-gray-800 dark:text-gray-200">
            {session && JSON.stringify(session, null, 2)}
          </pre>
        </section>

        {/* Placeholder for Additional Dashboard Components */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This section can be expanded with charts, reports, and other admin tools.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 p-5 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2024 Swachhta & LiFE. All rights reserved.
      </footer>
    </div>
  );
}

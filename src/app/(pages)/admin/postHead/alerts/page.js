'use client'
import React, { useState } from 'react';

function PostOfficeHeadAlerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Waste Disposal Issue', date: '2024-09-01', priority: 'High', status: 'Pending', assignedStaff: 'John Doe' },
    { id: 2, title: 'Broken Bin Lid', date: '2024-09-02', priority: 'Medium', status: 'Resolved', assignedStaff: 'Jane Smith' },
  ]);

  const handleSendAlert = (newAlert) => {
    setAlerts([...alerts, newAlert]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-4">
        {/* Alerts Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Total Alerts</h3>
              <p>{alerts.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Resolved Alerts</h3>
              <p>{alerts.filter(alert => alert.status === 'Resolved').length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Pending Alerts</h3>
              <p>{alerts.filter(alert => alert.status === 'Pending').length}</p>
            </div>
          </div>
        </section>

        {/* Send New Alert */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Send New Alert</h2>
          <form className="bg-white p-4 rounded shadow mb-4">
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Title</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Alert Title" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Description</label>
              <textarea className="w-full p-2 border rounded" placeholder="Alert Description"></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Priority</label>
              <select className="w-full p-2 border rounded">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Assigned Staff</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Staff Name" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Deadline</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <button type="button" onClick={handleSendAlert} className="bg-blue-500 text-white px-4 py-2 rounded">Send Alert</button>
          </form>
        </section>

        {/* Current Alerts */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Current Alerts</h2>
          <table className="w-full bg-white border border-gray-300 rounded shadow">
            <thead>
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Date</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Assigned Staff</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.id}>
                  <td className="p-2">{alert.title}</td>
                  <td className="p-2">{alert.date}</td>
                  <td className="p-2">{alert.priority}</td>
                  <td className="p-2">{alert.assignedStaff}</td>
                  <td className="p-2">{alert.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Alert History */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Alert History</h2>
          <table className="w-full bg-white border border-gray-300 rounded shadow">
            <thead>
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Date</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Assigned Staff</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.filter(alert => alert.status === 'Resolved').map(alert => (
                <tr key={alert.id}>
                  <td className="p-2">{alert.title}</td>
                  <td className="p-2">{alert.date}</td>
                  <td className="p-2">{alert.priority}</td>
                  <td className="p-2">{alert.assignedStaff}</td>
                  <td className="p-2">{alert.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default PostOfficeHeadAlerts;

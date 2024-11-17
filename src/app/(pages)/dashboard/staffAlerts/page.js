'use client'
import React, { useState } from 'react';

function StaffAlertsSection() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: "Recycling bins are not properly labeled.",
      area: "Main Hall",
      issuedDate: "2024-09-01",
      status: "Pending",
      details: "Recycling bins in the main hall are missing labels. Please label them correctly.",
      assignedTo: "John Doe",
      updates: []
    },
    {
      id: 2,
      message: "Energy-efficient lighting not installed.",
      area: "Office Area",
      issuedDate: "2024-09-03",
      status: "In Progress",
      details: "The office area is lacking energy-efficient lighting. Please install the required lights.",
      assignedTo: "Jane Smith",
      updates: [
        { date: "2024-09-05", comment: "Order placed for lighting." }
      ]
    },
  ]);

  const handleStatusUpdate = (alertId, newStatus, comment) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: newStatus, updates: [...alert.updates, { date: new Date().toISOString().split('T')[0], comment }] }
          : alert
      )
    );
  };

  return (
    <section id="alerts" className="mb-8">
      <h2 className="text-2xl font-bold mb-4">My Alerts</h2>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Active Alerts</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Message</th>
              <th className="p-2">Area</th>
              <th className="p-2">Issued Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.id}>
                <td className="p-2">{alert.message}</td>
                <td className="p-2">{alert.area}</td>
                <td className="p-2">{alert.issuedDate}</td>
                <td className="p-2">{alert.status}</td>
                <td className="p-2">
                  <button 
                    onClick={() => document.getElementById(`details-${alert.id}`).classList.toggle('hidden')}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(alert.id, 'In Progress', 'Started working on it')}
                    className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Mark In Progress
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(alert.id, 'Resolved', 'Issue resolved')}
                    className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Mark Resolved
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {alerts.map(alert => (
        <div id={`details-${alert.id}`} key={alert.id} className="bg-white p-4 rounded shadow mb-6 hidden">
          <h3 className="text-xl font-semibold mb-2">Alert Details</h3>
          <p><strong>Message:</strong> {alert.message}</p>
          <p><strong>Area:</strong> {alert.area}</p>
          <p><strong>Issued Date:</strong> {alert.issuedDate}</p>
          <p><strong>Status:</strong> {alert.status}</p>
          <p><strong>Details:</strong> {alert.details}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Updates</h4>
            <ul className="list-disc pl-5">
              {alert.updates.map((update, index) => (
                <li key={index}>{update.date}: {update.comment}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Add Comment</h4>
            <textarea 
              rows="3" 
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Add your comments here"
            ></textarea>
            <button 
              onClick={() => handleStatusUpdate(alert.id, alert.status, document.querySelector(`#details-${alert.id} textarea`).value)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Comment
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StaffAlertsSection;

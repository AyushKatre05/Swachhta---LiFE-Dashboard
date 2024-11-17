'use client'
import React, { useState } from 'react';

function ReportsPage() {
  const [showReportDetails, setShowReportDetails] = useState(null);
  const [reports, setReports] = useState([
    { id: 1, title: 'Issue with Waste Disposal', date: '2024-09-01', status: 'Pending' },
    { id: 2, title: 'Broken Bin Lid', date: '2024-09-02', status: 'Resolved' },
  ]);
  const [newReport, setNewReport] = useState({
    title: '',
    date: '',
    description: '',
    attachments: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewReport(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    // Handle report submission logic here
    console.log('Report submitted:', newReport);
    // Clear form
    setNewReport({
      title: '',
      date: '',
      description: '',
      attachments: null,
    });
  };

  const handleViewDetails = (reportId) => {
    setShowReportDetails(reportId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          {/* Report Submission Form */}
          <section id="report-submission" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Submit a New Report</h2>
            <form onSubmit={handleSubmitReport} className="bg-white p-4 rounded shadow">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newReport.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter report title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newReport.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={newReport.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter report description"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Attachments</label>
                <input
                  type="file"
                  name="attachments"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit Report
              </button>
            </form>
          </section>

          {/* Pending Reports List */}
          <section id="pending-reports" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Pending Reports</h2>
            <table className="w-full bg-white border border-gray-300 rounded shadow">
              <thead>
                <tr>
                  <th className="p-2">Title</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.filter(report => report.status === 'Pending').map(report => (
                  <tr key={report.id}>
                    <td className="p-2">{report.title}</td>
                    <td className="p-2">{report.date}</td>
                    <td className="p-2">{report.status}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleViewDetails(report.id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Report Details */}
          {showReportDetails && (
            <section id="report-details" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Report Details</h2>
              <div className="bg-white p-4 rounded shadow">
                <p><strong>Title:</strong> Example Report Title</p>
                <p><strong>Date:</strong> 2024-09-01</p>
                <p><strong>Description:</strong> Detailed description of the report.</p>
                <div>
                  <strong>Attachments:</strong>
                </div>
                <p><strong>Status:</strong> Pending</p>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Comments/Updates</h4>
                  <textarea
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Add comments or updates"
                  ></textarea>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Comment
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Resolved Reports */}
          <section id="resolved-reports">
            <h2 className="text-2xl font-bold mb-4">Resolved Reports</h2>
            <table className="w-full bg-white border border-gray-300 rounded shadow">
              <thead>
                <tr>
                  <th className="p-2">Title</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.filter(report => report.status === 'Resolved').map(report => (
                  <tr key={report.id}>
                    <td className="p-2">{report.title}</td>
                    <td className="p-2">{report.date}</td>
                    <td className="p-2">{report.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ReportsPage;

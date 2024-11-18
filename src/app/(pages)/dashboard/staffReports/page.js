'use client';
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
    setNewReport((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    console.log('Report submitted:', newReport);

    setReports((prevReports) => [
      ...prevReports,
      {
        id: prevReports.length + 1,
        title: newReport.title,
        date: newReport.date,
        status: 'Pending',
      },
    ]);

    // Clear form
    setNewReport({
      title: '',
      date: '',
      description: '',
      attachments: null,
    });
  };

  const handleViewDetails = (reportId) => {
    setShowReportDetails(reports.find((report) => report.id === reportId));
  };

  const handleCloseDetails = () => {
    setShowReportDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          {/* Report Submission Form */}
          <section id="report-submission" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Submit a New Report</h2>
            <form onSubmit={handleSubmitReport} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newReport.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700"
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
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700"
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
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700"
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
                  className="w-full border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit Report
              </button>
            </form>
          </section>

          {/* Pending Reports List */}
          <section id="pending-reports" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Pending Reports</h2>
            {reports.filter((report) => report.status === 'Pending').length > 0 ? (
              <table className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow">
                <thead>
                  <tr>
                    <th className="p-2">Title</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports
                    .filter((report) => report.status === 'Pending')
                    .map((report) => (
                      <tr key={report.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="p-2">{report.title}</td>
                        <td className="p-2">{report.date}</td>
                        <td className="p-2">{report.status}</td>
                        <td className="p-2">
                          <button
                            onClick={() => handleViewDetails(report.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>No pending reports.</p>
            )}
          </section>

          {/* Report Details */}
          {showReportDetails && (
            <section id="report-details" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Report Details</h2>
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <p>
                  <strong>Title:</strong> {showReportDetails.title}
                </p>
                <p>
                  <strong>Date:</strong> {showReportDetails.date}
                </p>
                <p>
                  <strong>Description:</strong> Detailed description of the report goes here.
                </p>
                <p>
                  <strong>Status:</strong> {showReportDetails.status}
                </p>
                <button
                  onClick={handleCloseDetails}
                  className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </section>
          )}

          {/* Resolved Reports */}
          <section id="resolved-reports">
            <h2 className="text-2xl font-bold mb-4">Resolved Reports</h2>
            {reports.filter((report) => report.status === 'Resolved').length > 0 ? (
              <table className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow">
                <thead>
                  <tr>
                    <th className="p-2">Title</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports
                    .filter((report) => report.status === 'Resolved')
                    .map((report) => (
                      <tr key={report.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="p-2">{report.title}</td>
                        <td className="p-2">{report.date}</td>
                        <td className="p-2">{report.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>No resolved reports.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default ReportsPage;

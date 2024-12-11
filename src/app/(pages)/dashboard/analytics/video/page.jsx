"use client"
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import { Medal } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsPage = () => {
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/post_office_stats.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvData = await response.text();

        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        }).data;

        setTableData(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing CSV data:", error);
      }
    };

    fetchCSV();
  }, []);

  const getMedal = (rank) => {
    if (rank === 1) return <Medal className="text-yellow-500" />;
    if (rank === 2) return <Medal className="text-gray-400" />;
    if (rank === 3) return <Medal className="text-orange-500" />;
    return rank; // For ranks 4 and above, display the rank number
  };

  const handlePostChange = (event) => {
    const postName = event.target.value;
    setSelectedPost(postName);
  };

  if (tableData.length === 0) {
    return <p>Loading...</p>;
  }

  const calculateAverages = (data) => {
    const total = {
      resolutionTime: 0,
      alertsGenerated: 0,
      paperIntake: 0,
    };
    data.forEach((entry) => {
      total.resolutionTime += entry["Avg. Resolution Time (Hours)"];
      total.alertsGenerated += entry["Alerts Generated"];
      total.paperIntake += entry["Monthly Paper Waste (kg)"];
    });
    const count = data.length;
    return {
      resolutionTime: total.resolutionTime / count,
      alertsGenerated: total.alertsGenerated / count,
      paperIntake: total.paperIntake / count,
    };
  };

  const averages = calculateAverages(tableData);

  // Rank the posts based on their paper waste
  const rankedTableData = tableData
    .map((entry) => ({
      ...entry,
      rank: 0, // Temporary rank to be replaced below
    }))
    .sort((a, b) => a["Monthly Paper Waste (kg)"] - b["Monthly Paper Waste (kg)"])
    .map((entry, index) => {
      const rank = index + 1;
      return { ...entry, rank };
    });

  const selectedPostData = rankedTableData.find(
    (entry) => entry["Post Name"] === selectedPost
  );

  const allPostsChartData = {
    labels: tableData.map((entry) => entry["Post Name"]),
    datasets: [
      {
        label: 'Average Metric Value per Post',
        data: tableData.map((entry) => {
          // Calculate the average of the three metrics for each post
          const resolutionTime = entry["Avg. Resolution Time (Hours)"] || 0;
          const alertsGenerated = entry["Alerts Generated"] || 0;
          const paperWaste = entry["Monthly Paper Waste (kg)"] || 0;
          return (resolutionTime + alertsGenerated + paperWaste) / 3;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.7)', // Single consistent color for the bars
      },
    ],
  };
  

  const selectedPostChartData = selectedPostData
    ? {
        labels: [
          'Avg. Resolution Time (Hours)',
          'Alerts Generated',
          'Monthly Paper Waste (kg)'
        ],
        datasets: [
          {
            label: selectedPost,
            data: [
              selectedPostData["Avg. Resolution Time (Hours)"],
              selectedPostData["Alerts Generated"],
              selectedPostData["Monthly Paper Waste (kg)"],
            ],
            backgroundColor: 'rgba(0, 123, 255, 0.7)',
          },
          {
            label: 'Average',
            data: [
              averages.resolutionTime,
              averages.alertsGenerated,
              averages.paperIntake
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
          },
        ],
      }
    : null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Post Office Analytics</h1>

      <div className="mb-4">
        <label htmlFor="postSelect" className="mr-2">Select Post Office:</label>
        <select
          id="postSelect"
          value={selectedPost || ''}
          onChange={handlePostChange}
          className="p-2 border border-gray-300"
        >
          <option value="">Show All Post Offices</option>
          {tableData.map((entry) => (
            <option key={entry["Post Name"]} value={entry["Post Name"]}>
              {entry["Post Name"]}
            </option>
          ))}
        </select>
      </div>

      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        {selectedPost ? (
          <Bar data={selectedPostChartData} />
        ) : (
          <Bar data={allPostsChartData} />
        )}
      </div>

      <h2 className="text-xl font-bold mt-6 mb-4">Rankings</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Rank</th>
            <th className="border border-gray-300 px-4 py-2">Post Name</th>
            <th className="border border-gray-300 px-4 py-2">Region</th>
            <th className="border border-gray-300 px-4 py-2">Waste (kg)</th>
          </tr>
        </thead>
        <tbody>
          {rankedTableData.map((entry) => (
            <tr key={entry["Post Name"]}>
              <td className="border border-gray-300 px-4 py-2">{getMedal(entry.rank)}</td>
              <td className="border border-gray-300 px-4 py-2">{entry["Post Name"]}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.Region}</td>
              <td className="border border-gray-300 px-4 py-2">{entry["Monthly Paper Waste (kg)"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsPage;

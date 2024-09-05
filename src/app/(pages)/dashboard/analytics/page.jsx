"use client"
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement, // Add PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the elements, including PointElement
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SwachhtaCharts = () => {
  // Data for Bar Chart (Post Office Cleanliness and Green Practices)
  const barData = {
    labels: ['Post Office 1', 'Post Office 2', 'Post Office 3', 'Post Office 4'],
    datasets: [
      {
        label: 'Cleanliness Score',
        data: [85, 90, 78, 88],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Green Practices Score',
        data: [70, 82, 60, 95],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  // Data for Line Chart (Cleanliness Over Time)
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Cleanliness Score - Post Office 1',
        data: [85, 87, 90, 92],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Cleanliness Score - Post Office 2',
        data: [90, 85, 88, 91],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  // Data for Pie Chart (Green Practices Breakdown)
  const pieData = {
    labels: ['Solar Energy', 'Recycling', 'Water Conservation', 'Waste Management'],
    datasets: [
      {
        label: 'Green Practices Adoption',
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Enable flexible chart resizing
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Swachhta and Green Practices Monitoring',
      },
    },
  };

  return (
    <div className='container'>
      <h2>Swachhta and LiFE Monitoring Dashboard</h2>
      
      {/* Bar Chart */}
      <div className='chartContainer'>
        <h3>Cleanliness and Green Practices Scores</h3>
        <Bar data={barData} options={options} />
      </div>

      {/* Line Chart */}
      <div className='chartContainer'>
        <h3>Cleanliness Score Over Time</h3>
        <Line data={lineData} options={options} />
      </div>

      {/* Pie Chart */}
      <div className='chartContainer'>
        <h3>Green Practices Breakdown</h3>
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default SwachhtaCharts;

"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { PulseLoader } from 'react-spinners'; // Import loading spinner

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

function Home() {
  const [result, setResult] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleVideoUpload = async () => {
    if (!selectedFile) {
      alert('Please select a video file first.');
      return;
    }

    setLoading(true); // Set loading to true

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/detect/video', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);

      // Fetch the processed video from the Flask API
      const processedVideoUrl = `http://localhost:5000/download/video?video_path=${data.processed_video_path}`;
      setVideoUrl(processedVideoUrl);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const chartData = {
    labels: ['Total Waste Area', 'Image Area', 'Percentage Waste'],
    datasets: [
      {
        label: 'Waste Analysis',
        data: [
          result ? result.total_waste_area : 0,
          result ? result.image_area : 0,
          result ? result.percentage_waste : 0
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 2
      }
    ]
  };

  const pieChartData = {
    labels: ['Waste Detected', 'No Waste'],
    datasets: [
      {
        data: [
          result ? result.total_waste_area : 0,
          result ? (result.image_area - result.total_waste_area) : 0
        ],
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const lineChartData = {
    labels: ['Frame 1', 'Frame 2', 'Frame 3', 'Frame 4'], // Example frames
    datasets: [
      {
        label: 'Waste Area Over Time',
        data: [30, 40, 35, 50], // Example data
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        fill: true
      }
    ]
  };

  const doughnutChartData = {
    labels: ['Detected Waste', 'Remaining Area'],
    datasets: [
      {
        data: [
          result ? result.total_waste_area : 0,
          result ? (result.image_area - result.total_waste_area) : 0
        ],
        backgroundColor: ['#FFCE56', '#E0E0E0'],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white flex flex-col items-center p-6"
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Upload Video for Detection</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-6 p-2 bg-white text-black rounded-lg"
      />
      <button
        onClick={handleVideoUpload}
        className="mb-6 px-4 py-2 bg-yellow-500 text-black rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
      >
        Upload Video
      </button>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <PulseLoader color="#ffffff" loading={loading} />
        </div>
      ) : result && (
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">Results:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-2 text-center">Bar Chart</h3>
              <div className="w-full h-64 lg:h-80">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-2 text-center">Line Chart</h3>
              <div className="w-full h-64 lg:h-80">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-2 text-center">Pie Chart</h3>
              <div className="w-full h-64 lg:h-80">
                <Pie data={pieChartData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-2 text-center">Doughnut Chart</h3>
              <div className="w-full h-64 lg:h-80">
                <Doughnut data={doughnutChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      )}
      {videoUrl && (
        <div className="mt-6 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-2 text-center">Processed Video:</h2>
          <video controls src={videoUrl} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      )}
    </motion.div>
  );
}

export default Home;

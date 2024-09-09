"use client";
import { useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
} from 'chart.js';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
);

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState(null); // 'image' or 'video'
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const type = file.type.split('/')[0]; // Get 'image' or 'video'
            setFileType(type);
            setResult(null); // Clear previous result
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !fileType) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append(fileType, selectedFile);

        try {
            const endpoint = 'https://detection-with-yolo.onrender.com/process_image';
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (fileType === 'image') {
                const { processed_image, total_area, image_area, percentage_waste } = response.data;
                const imageUrl = `data:image/jpeg;base64,${processed_image}`;
                setResult({
                    type: 'image',
                    imageUrl,
                    totalArea: total_area,
                    imageArea: image_area,
                    percentageWaste: percentage_waste
                });
            } else if (fileType === 'video') {
                const { video_url, average_area, percentage_waste } = response.data;
                setResult({
                    type: 'video',
                    videoUrl: video_url,
                    averageArea: average_area,
                    percentageWaste: percentage_waste
                });
            }
        } catch (err) {
            setError('Error uploading file');
        } finally {
            setLoading(false);
        }
    };

    const getImagePieChartData = () => ({
        labels: ['Total Area of Waste', 'Image Area'],
        datasets: [{
            data: [result.totalArea, result.imageArea],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1,
        }],
    });

    const getImageBarChartData = () => ({
        labels: ['Waste Area', 'Image Area'],
        datasets: [{
            label: 'Area (unit sq)',
            data: [result.totalArea, result.imageArea],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1,
        }],
    });

    const getVideoPieChartData = () => ({
        labels: ['Average Area of Waste', 'Percentage of Waste'],
        datasets: [{
            data: [result.averageArea, result.percentageWaste],
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
        }],
    });

    const getLineChartData = () => ({
        labels: ['Frame 1', 'Frame 2', 'Frame 3', 'Frame 4'], // Sample data
        datasets: [{
            label: 'Waste Area Over Time',
            data: [20, 50, 30, 70], // Sample data
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
        }],
    });

    const getMixedChartData = () => ({
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
            {
                type: 'bar',
                label: 'Bar Dataset',
                data: [10, 20, 30, 40],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                type: 'line',
                label: 'Line Dataset',
                data: [40, 30, 20, 10],
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false
            }
        ]
    });

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Upload and Process File</h1>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input 
                    type="file" 
                    accept="image/*,video/*" 
                    onChange={handleFileChange} 
                    className="p-2 border border-gray-300 rounded w-full sm:w-auto"
                />
                <Button 
                    onClick={handleUpload} 
                    disabled={loading}
                    className="bg-blue-500 text-white p-6 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {result && result.type === 'image' && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5 }} 
                    className="flex flex-col items-center mt-6 w-full"
                >
                    <h2 className="text-xl font-semibold mb-4">Processed Image</h2>
                    <img src={result.imageUrl} alt="Processed" className="w-full max-w-md mb-4" />
                    <p>Total Area of waste detected: {result.totalArea} unit sq</p>
                    <p>Area of the image frame: {result.imageArea} unit sq</p>
                    <p>The Percentage of Waste detected in the image is: {result.percentageWaste}%</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-4">
                        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                            <h3 className="text-lg font-medium mb-2">Waste Area vs. Image Area (Bar Chart)</h3>
                            <Bar
                                data={getImageBarChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' },
                                        title: { display: true, text: 'Waste Area vs. Image Area' },
                                    },
                                }}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                            <h3 className="text-lg font-medium mb-2">Waste Distribution (Pie Chart)</h3>
                            <Pie
                                data={getImagePieChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' },
                                        title: { display: true, text: 'Waste Distribution' },
                                    },
                                }}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                            <h3 className="text-lg font-medium mb-2">Waste Area Over Time (Line Chart)</h3>
                            <Line
                                data={getLineChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' },
                                        title: { display: true, text: 'Waste Area Over Time' },
                                    },
                                }}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                            <h3 className="text-lg font-medium mb-2">Mixed Data (Mixed Chart)</h3>
                            <Bar
                                data={getMixedChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' },
                                        title: { display: true, text: 'Mixed Data Chart' },
                                    },
                                }}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
            {result && result.type === 'video' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mt-6 w-full"
                >
                    <h2 className="text-xl font-semibold mb-4">Processed Video</h2>
                    <p>Average Area of waste detected: {result.averageArea} unit sq</p>
                    <p>The Percentage of Waste detected in the video is: {result.percentageWaste}%</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-4">
                        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                            <h3 className="text-lg font-medium mb-2">Waste vs. Total Percentage (Pie Chart)</h3>
                            <Pie
                                data={getVideoPieChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' },
                                        title: { display: true, text: 'Waste vs. Total Percentage' },
                                    },
                                }}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                            <h3 className="text-lg font-medium mb-2">Waste Area Over Time (Line Chart)</h3>
                            <Line
                                data={getLineChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' },
                                        title: { display: true, text: 'Waste Area Over Time' },
                                    },
                                }}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Upload;

import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import './../styles/AnalyticsPage.css'
import LoadingSpinner from './LoadingSpinner';

function AnalyticsPage() {
    const [keywordChartData, setKeywordChartData] = useState(null);
    const [lineData, setLineData] = useState(null);
    const [locationChartData, setLocationChartData] = useState(null);

    const [startDateString, setStartDateString] = useState(null);
    const [endDateString, setEndDateString] = useState(null);

    useEffect(() => {
        const setKeywordChart = (keywordLabel, keywordDataCounts) => {
            setKeywordChartData({
                labels: keywordLabel,
                datasets: [
                    {
                        data: keywordDataCounts,
                        borderWidth: 1,
                        hoverOffset: 4,
                    },
                ],});
        };

        const setJobsChart = (jobsLabel, jobsDataPoints, avgJobsAppliedDataPoints, startDateString, endDateString) => {
            setStartDateString(startDateString);
                setEndDateString(endDateString);
                setLineData({
                    labels: jobsLabel,
                    datasets: [
                        {
                            label: `Jobs Applied`,
                            data: jobsDataPoints,
                            fill: false,
                            borderColor: `rgb(75,192,192)`,
                            tension: 0.1,
                        },
                        {
                            label: "Average applied jobs",
                            data: avgJobsAppliedDataPoints,
                            fill: false,
                            borderColor: `rgb(255,69,0)`,
                            tension: 0.1,
                        }
                    ]
                });
        };

        const setLocationChart = (locationLabel, locationDataCounts) => {
            setLocationChartData({
                labels: locationLabel,
                datasets: [
                    {
                        data: locationDataCounts,
                        borderWidth: 1,
                        hoverOffset: 3,
                    },
                ],
            });
        };
        const retrieveAllAnalyticData = async () => {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/display-all-data`
            ).then(response => {
                const data = response.data;
                const {
                    keywordLabel, keywordDataCounts,
                    jobsLabel, jobsDataPoints, avgJobsAppliedDataPoints, startDateString, endDateString,
                    locationLabel, locationDataCounts,
                } = data;
                setKeywordChart(keywordLabel, keywordDataCounts);
                setJobsChart(jobsLabel, jobsDataPoints, avgJobsAppliedDataPoints, startDateString, endDateString);
                setLocationChart(locationLabel, locationDataCounts);
            }).catch(error => {
                console.error("Error occurred during analytics retrieval --", error);
            });
        };

        retrieveAllAnalyticData();

    }, []);


    if (!keywordChartData || !lineData || !locationChartData) {
        return <div><LoadingSpinner /></div>
    }

    return (
        <div className='analytics-graphs'>
            <div className='pie-chart-container'>
                <div className='keyword-pie'>

                    <h2>Pie Chart: Distribution of Keywords</h2>
                    <Pie
                        // width='200px'
                        height='200px'

                        data={keywordChartData}
                        options={
                            {
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'bottom',
                                    },
                                },
                                maintainAspectRatio: true
                            }

                        }
                    />
                </div>
                <div className='location-pie'>
                    <h2>Pie Chart: Distribution of Location Applied</h2>

                    <Pie
                        // width='200px'
                        height='200px'

                        data={locationChartData}
                        options={
                            {
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'bottom',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (tooltipItem) {
                                                const dataset = tooltipItem.dataset;
                                                const currentValue = dataset.data[tooltipItem.dataIndex];
                                                const total = dataset.data.reduce((acc, value) => acc + value, 0);
                                                const percentage = ((currentValue / total) * 100).toFixed(2);
                                                return `${tooltipItem.label}: ${percentage}%`;
                                            },
                                        },
                                    },
                                    maintainAspectRatio: false,
                                },
                            }
                        }

                    />
                </div>
            </div>


            <h2>Time Graph: Between <text style={{color:'blue'}}>{startDateString}</text> to <text style={{color:'blue'}}>{endDateString}</text></h2>
            <Line
                data={lineData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: '# of Jobs Applied',
                                font: {
                                    size: 12,
                                    weight: 'bold',
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Day',
                                font: {
                                    size: 12,
                                    weight: 'bold',
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default AnalyticsPage
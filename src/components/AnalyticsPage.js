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

        const retrieveChartData = async () => {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/display-data-pie`,
            ).then(response => {
                const data = response.data;
                setKeywordChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            data: data.dataCounts,
                            borderWidth: 1,
                            hoverOffset: 4,
                        },
                    ],
                });
            }).catch(error => {
                console.error("Error when retrieving Chart data ---", error);
            })
        };

        const retrieveLineData = async () => {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/display-data-line`,
            ).then(response => {
                const data = response.data;
                console.log(data);
                setStartDateString(data.startDateString);
                setEndDateString(data.endDateString);
                setLineData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: `Jobs Applied`,
                            data: data.dataPoints,
                            fill: false,
                            borderColor: `rgb(75,192,192)`,
                            tension: 0.1,
                        },
                        {
                            label: "Average applied jobs",
                            data: data.avg_dataPoints,
                            fill: false,
                            borderColor: `rgb(255,69,0)`,
                            tension: 0.1,
                        }
                    ]
                })
            }).catch(error => {
                console.error("Error when retrieving Line Data ---", error);
            })
        };

        const retrieveLocationData = async () => {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/display-location-pie`,
            ).then(response => {
                const data = response.data;
                // console.log(data);
                setLocationChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            data: data.dataCounts,
                            borderWidth: 1,
                            hoverOffset: 3,
                        },
                    ],
                });
            }).catch(error => {
                console.error("Error retrieving location data ---", error);
            });
        };
        retrieveChartData();
        retrieveLocationData();
        retrieveLineData();

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
import React, {useEffect, useState} from 'react';
import {Pie, Line} from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import './../styles/AnalyticsPage.css'
import LoadingSpinner from './LoadingSpinner';

function AnalyticsPage() {
  const [chartData, setChartData] = useState(null);
  const [lineData, setLineData] = useState(null);

    useEffect(() => {
        
        const retrieveChartData = async () => {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/display-data-pie`,
            ).then(response => {
                const data = response.data;
                setChartData({
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
        }
        
        const retrieveLineData = async () => {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/display-data-line`,
            ).then(response => {
                const data = response.data;
                setLineData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: `Timeline from ${data.startDateString} - ${data.endDateString}`,
                            data: data.dataPoints,
                            fill: false,
                            borderColor: `rgb(75,192,192)`,
                            tension: 0.1,
                        }
                    ]
                })
            }).catch(error => {
                console.error("Error when retrieving Line Data ---", error);
            })
        }
        retrieveChartData();
        retrieveLineData();
    }, []);


    if (!chartData || !lineData){
        return <div><LoadingSpinner /></div>
    }

    return (
        <div className='analytics-graphs'>
            <h2>Pie Chart: Distribution of Keywords</h2>
            <Pie
                // width='200px'
                height='200px' 
                
                data={chartData} 
                options = {
                    {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                    },
                    maintainAspectRatio: false
                }

                }
            />

            <h2>Time Graph</h2>
            <Line 
                data =  {lineData}
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
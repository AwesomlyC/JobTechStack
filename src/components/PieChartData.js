import React, {useEffect, useState} from 'react';
import {Pie, Line} from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

function PieChartData() {
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
                console.log(response.data)
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
        return <div>Loading...</div>
    }

    return (
        <div style={{ width: '50%', margin: 'auto' }}>
            <Pie 
                data={chartData} 
                options = {{
                    plugins: {
                        legend: {
                            display: true,
                            position: 'left',
                        },
                    }}
                }
            />

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

export default PieChartData
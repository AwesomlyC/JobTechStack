import React, {useEffect, useState} from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

function PieChartData() {
  const [chartData, setChartData] = useState(null);

    useEffect(() => {
        
        const retrieveChartData = async () => {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/display-data-pie`,
            ).then(response => {
                    console.log(response);
                    const data = response.data;
                    console.log(data.labels)
                    console.log(data.labels.slice(0,4));

                    console.log(data.dataCounts);
                    console.log(data.dataCounts.slice(0,4));

                setChartData({
                    labels: data.labels,
                    datasets:[
                        {
                            data: data.dataCounts,
                            // backgroundColor: [
                            //     'rgba(255, 99, 132, 0.2)',
                            //     'rgba(54, 162, 235, 0.2)',
                            //     'rgba(255, 206, 86, 0.2)',
                            //     'rgba(75, 192, 192, 0.2)',
                            //   ],
                            //   borderColor: [
                            //     'rgba(255, 99, 132, 1)',
                            //     'rgba(54, 162, 235, 1)',
                            //     'rgba(255, 206, 86, 1)',
                            //     'rgba(75, 192, 192, 1)',
                            //   ],
                            borderWidth: 1,
                            hoverOffset: 4,
                        },
                    ],
                });
            }).catch(error => {
                console.error("Error when retrieving chart data ---",  error);
            })
        }

        retrieveChartData();
    }, []);


    if (!chartData){
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
        </div>
  )
}

export default PieChartData
import React, { useMemo } from 'react';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';

function JobsAppliedLineChart({ data }) {
    const jobsAppliedData = useMemo(() => ({
        labels: data.jobsLabel,
        datasets: [
            {
                label: `Jobs Applied`,
                data: data.jobsDataPoints,
                fill: false,
                borderColor: `rgb(75,192,192)`,
                tension: 0.1,
            },
            {
                label: "Average applied jobs",
                data: data.avgJobsAppliedDataPoints,
                fill: false,
                borderColor: `rgb(255,69,0)`,
                tension: 0.1,
            }
        ]
    }), [data.jobsLabel, data.jobsDataPoints, data.avgJobsAppliedDataPoints]);
    return (
        <>
            <h2 style={{paddingBottom: "2rem"}}>Time Graph: Between
                <text style={{ color: '#00ffff' }}> {data.startDateString}</text> to <text style={{ color: '#00ffff' }}>{data.endDateString}
                </text>
            </h2>
            <Line
                data={jobsAppliedData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                        },
                        
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: "#FF6384",
                            },
                            title: {
                                display: true,
                                text: 'Total Jobs Applied',
                                font: {
                                    size: 16,
                                    weight: 'bold',
                                },
                                color: "#00ff7f",
                            },
                            grid: {
                                color: "#737373",
                            }
                        },
                        x: {
                            ticks: {
                                color: "#FF6384",
                            },
                            title: {
                                display: true,
                                text: 'Day',
                                font: {
                                    size: 16,
                                    weight: 'bold',
                                },
                                color: "#00ff7f",
                            },
                            grid: {
                                color: "#737373",
                            }
                        }
                    }
                }}
            />
        </>

    )
}

export default JobsAppliedLineChart
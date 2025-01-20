import React, { useMemo } from 'react';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';

function JobsAppliedLineChart({ data }) {
    console.log("JOB LINE DATA",data);
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
            <h2>Time Graph: Between
                <text style={{ color: 'blue' }}> {data.startDateString}</text> to <text style={{ color: 'blue' }}>{data.endDateString}
                </text>
            </h2>
            <Line
                data={jobsAppliedData}
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
                                text: 'Total Jobs Applied',
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
        </>

    )
}

export default JobsAppliedLineChart
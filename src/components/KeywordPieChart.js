import React, { useMemo } from 'react'
import { Pie } from 'react-chartjs-2';
function KeywordPieChart({ data }) {
    const keywordData = useMemo(() => ({
        labels: data.keywordLabel,
        datasets: [
            {
                data: data.keywordDataCounts,
                borderWidth: 1,
                hoverOffset: 4,
            },
        ],
    }), [data.keywordLabel, data.keywordDataCounts]);
    return (
        <div className='keyword-pie'>

            <h2>Pie Chart: Distribution of Keywords</h2>
            <Pie
                height='200px'

                data={keywordData}
                options={
                    {
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                        },
                        maintainAspectRatio: true,
                        animation: false,
                        responsive: true,
                    }
                }
            />
        </div>
    )
}

export default KeywordPieChart
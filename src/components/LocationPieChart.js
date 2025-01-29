import React, {useMemo} from 'react';
import {Pie} from 'react-chartjs-2';
function LocationPieChart({data}) {

    const locationData = useMemo(() => ({
                labels: data.locationLabel,
                datasets: [
                    {
                        data: data.locationDataCounts,
                        borderWidth: 1,
                        hoverOffset: 4,
                    },
                ],
            }), [data.locationLabel, data.locationDataCounts]);
  return (
    <div className='keyword-pie'>

        <h2>Pie Chart: Distribution of Locations Applied</h2>
        <Pie
            // width='200px'
            height='200px'

            data={locationData}
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

export default LocationPieChart
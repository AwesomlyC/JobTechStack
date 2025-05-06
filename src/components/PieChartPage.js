import React, { useEffect, useState} from 'react';
import axios from 'axios';
import 'chart.js/auto';
import './../styles/PieChartPage.css'
import LoadingSpinner from './LoadingSpinner';
import KeywordPieChart from './KeywordPieChart';
import LocationPieChart from './LocationPieChart';
import { useUserContext } from './UserProvider';

function PieChartPage() {
    const [data, setData] = useState(null);
    const userID = useUserContext();
    useEffect(() => {
        const retrievePieData = async () => {
            if (!userID){
                return;
            }
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/analytics/display-pie-chart-data`,
                {userID: userID.id}
            ).then(response => {
                setData(response.data);
            }).catch(error => {
                console.error(error);
            })
        };
        retrievePieData();
    }, [userID]);

    if (!data){
        return <div><LoadingSpinner /></div>
    }
  return (
    <div className='analytics-graphs'>

        <div className='pie-chart-container'>
            <KeywordPieChart 
                data = {data}
            />
            <LocationPieChart 
                data = {data}
            />
        </div>
    </div>

  )
}

export default PieChartPage
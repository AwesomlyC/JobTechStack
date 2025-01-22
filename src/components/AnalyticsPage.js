import React, { useEffect, useState} from 'react';
import axios from 'axios';
import 'chart.js/auto';
import './../styles/AnalyticsPage.css'
import LoadingSpinner from './LoadingSpinner';
import KeywordPieChart from './KeywordPieChart';
import LocationPieChart from './LocationPieChart';
import JobsAppliedLineChart from './JobsAppliedLineChart';
import { useUserContext } from './UserProvider';

function AnalyticsPage() {
    const [data, setData] = useState(null);
    const userID = useUserContext().id;

    useEffect(() => {

        const retrieveAllAnalyticData = async () => {
            if (!userID){
                return
            }
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/analytics/display-all-data`,
                {userID}
            ).then(response => {
                const data = response.data;
                setData(data);
            }).catch(error => {
                console.error("Error occurred during analytics retrieval --", error);
            });
        };

        retrieveAllAnalyticData();

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
            <JobsAppliedLineChart 
                data = {data}
            />
        </div>
    )
}

export default AnalyticsPage
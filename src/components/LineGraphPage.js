import React, { useEffect, useState } from 'react'
import axios from 'axios';

import JobsAppliedLineChart from './JobsAppliedLineChart';
import LoadingSpinner from './LoadingSpinner';
import { useUserContext } from './UserProvider';

function LineGraphPage() {
    const [data, setData] = useState(null);
    const userID = useUserContext().id;
    useEffect(() => {
        const retrieveLineData = async () => {
            if (!userID) {
                return;
            }
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/analytics/display-line-graph-data`,
                { userID }
            ).then(response => {
                setData(response.data);
            }).catch(error => {
                console.error("Error during line-data", error);
            })
        };
        retrieveLineData();
    }, [userID]);

    if (!data) {
        return <div><LoadingSpinner /></div>
    }

    return (
        <div style={{
            width: "60vw",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            margin: 'auto',
        }}>
            <JobsAppliedLineChart
                data={data}
            />
        </div>
    )
}

export default LineGraphPage
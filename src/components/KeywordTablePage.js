import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GlobalKeywordTable from './GlobalKeywordTable';
import '../styles/JobTracker.css'
import LoadingSpinner from './LoadingSpinner';
import { useUserContext } from './UserProvider';

function KeywordTablePage() {
  const [globalStatistics, setGlobalStatistics] = useState(null);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const userID = useUserContext();
  useEffect(() => {
    if (!userID) {
      return;
    }
    const retrieveGlobalStatistics = async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/stats/global-statistics`,
        {userID: userID.id},
      ).then(response => {
        setInformation(response.data);
        setTotalDocuments(response.data.length);
      }).catch(error => {
        console.error("Error when retrieving global statistics ---", error);
      });
    };
    retrieveGlobalStatistics();
  }, [userID]);

  const setInformation = (data) => {
    setGlobalStatistics(data.sortedDict);
  }

  if (!globalStatistics ) {
    return <div><LoadingSpinner isLoading={!globalStatistics} /></div>
  }

  return (
    <div>
      <h2 className='keyword-header'>
        Across <text style={{color: '#1affff', fontSize: '28px'}}>{totalDocuments}</text> of job's description, you've retrieved...
      </h2>
      <div className='content'>
        <GlobalKeywordTable globalStatistics={globalStatistics} />
      </div>
    </div>
  )
}

export default KeywordTablePage
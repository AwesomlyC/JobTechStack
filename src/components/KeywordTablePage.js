import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GlobalKeywordTable from './GlobalKeywordTable';
import '../styles/GlobalStatisticsPage.css'
import SearchFields from './SearchFields';
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
        {userID},
      ).then(response => {
        console.log(response.data);
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
    return <div><LoadingSpinner /></div>
  }

  return (
    <div>
      <h2 className='keyword-header'>
        Across <text style={{color: 'blue', fontSize: '28px'}}>{totalDocuments}</text> of job's description, you've retrieved...
      </h2>
      <div className='content'>
        <GlobalKeywordTable globalStatistics={globalStatistics} />
      </div>
    </div>
  )
}

export default KeywordTablePage
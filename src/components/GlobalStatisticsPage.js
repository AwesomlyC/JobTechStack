import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GlobalKeywordTable from './GlobalKeywordTable';
import '../styles/JobTracker.css'
import GlobalCompanyInformation from './GlobalCompanyInformation';
import SearchFields from './SearchFields';
import LoadingSpinner from './LoadingSpinner';
import { useUserContext } from './UserProvider';

// 
//    DEPRECATED
// 
// 


function GlobalStatisticsPage() {

  const [globalStatistics, setGlobalStatistics] = useState(null);
  const [hasRetrieve, setHasRetrieve] = useState(false);
  const [numberOfDocuments, setNumberOfDocuments] = useState(0);
  const [relevantCompanyInformation, setRelevantCompanyInformation] = useState(null);

  const [deleteMode, setDeleteMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [notesMode, setNotesMode] = useState(false);

  const [displayResults, setDisplayResults] = useState([]);

  const userID = useUserContext();
  useEffect(() => {
    if (hasRetrieve || !userID) {
      return;
    }
    const retrieveGlobalStatistics = async () => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/stats/global-statistics`,
        {userID: userID.id},
      ).then(response => {
        setInformation(response.data);
        setHasRetrieve(true);
      }).catch(error => {
        console.error("Error when retrieving global statistics ---", error);
      });
    };
    retrieveGlobalStatistics();
  }, [hasRetrieve, userID]);

  const setInformation = (data) => {
    setGlobalStatistics(data.sortedDict);
    setNumberOfDocuments(data.length);
    setRelevantCompanyInformation(data.relevantInformation);
    setDisplayResults(data.relevantInformation);
  }
  const flipDeleteMode = () => {
    setDeleteMode((e) => !e);
    setUpdateMode(false);
    setNotesMode(false);
  }

  const flipUpdateMode = () => {
    setUpdateMode((e) => !e);
    setDeleteMode(false);
    setNotesMode(false);
  }

  const flipNotesMode = () => {
    setNotesMode((e) => !e);
    setUpdateMode(false);
    setDeleteMode(false);
  }

  if (!globalStatistics || !relevantCompanyInformation) {
    return <div><LoadingSpinner isLoading={ !globalStatistics || !relevantCompanyInformation} /></div>
  }

  return (
    <div>
      <h1>Global Statistics for <text style={{ color: 'blue' }}>{numberOfDocuments}</text> documents</h1>
      <div className='content'>
        <GlobalKeywordTable globalStatistics={globalStatistics} />
      </div>

      <div className="statistics-container">
        <button
          className='update-button'
          onClick={flipUpdateMode}
        >
          <b><strong>Update</strong></b>

        </button>
        <button
          className='delete-button'
          onClick={flipDeleteMode}
        >
          <b><strong>Delete</strong></b>
        </button>
        <SearchFields
          setDisplayResults={setDisplayResults}
          relevantCompanyInformation={relevantCompanyInformation}
        />
        <GlobalCompanyInformation
          relevantCompanyInformation={displayResults}
          setDisplayResults = {setDisplayResults}
          setHasRetrieve={setHasRetrieve}
          deleteMode={deleteMode}
          flipDeleteMode={flipDeleteMode}

          updateMode={updateMode}
          flipUpdateMode={flipUpdateMode}

          notesMode={notesMode}
          flipNotesMode={flipNotesMode}
        />
      </div>
    </div>
  )
}

export default GlobalStatisticsPage
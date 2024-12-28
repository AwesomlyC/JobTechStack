import React, {useEffect, useState} from 'react'
import axios from 'axios'
import GlobalKeywordTable from './GlobalKeywordTable';
import '../styles/GlobalStatisticsPage.css'
import GlobalCompanyInformation from './GlobalCompanyInformation';
import SearchFields from './SearchFields';
function GlobalStatisticsPage() {

    const [globalStatistics, setGlobalStatistics] = useState({});
    const [hasRetrieve, setHasRetrieve] = useState(false);
    const [numberOfDocuments, setNumberOfDocuments] = useState(0);
    const [relevantCompanyInformation, setRelevantCompanyInformation] = useState([]);

    const [deleteMode, setDeleteMode] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);

    const [displayResults, setDisplayResults] = useState([]);

    useEffect( () => {
        if (hasRetrieve){
            return;
        }
        const retrieveGlobalStatistics = async () => {
            await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/global-statistics`,
            ).then(response => { 
              setInformation(response.data);
              setHasRetrieve(true);
            }).catch(error => {
              console.error("Error when retrieving global statistics ---",  error);
            });
          };
          retrieveGlobalStatistics();
    }, [hasRetrieve])

    const setInformation = (data) => {
      setGlobalStatistics(data.sortedDict);
      setNumberOfDocuments(data.length);
      setRelevantCompanyInformation(data.relevantInformation);
      setDisplayResults(data.relevantInformation);
    }
    const flipDeleteMode = () => {
      setDeleteMode((e) => !e);
    }

    const flipUpdateMode = () => {
      console.log("FLIPPING", updateMode)
      setUpdateMode((e) =>!e);
    }
  return (
      <div>
          <h1>Global Statistics for <text style={{ color: 'blue' }}>{numberOfDocuments}</text> documents</h1>
          <div className='content'>
                <GlobalKeywordTable globalStatistics = {globalStatistics}/>
          </div>

        <div className = "statistics-container">
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
            setDisplayResults = {setDisplayResults}
            relevantCompanyInformation = {relevantCompanyInformation}
          />
          <GlobalCompanyInformation 
            relevantCompanyInformation = {displayResults}
            setHasRetrieve = {setHasRetrieve}
            deleteMode = {deleteMode}
            flipDeleteMode = {flipDeleteMode}

            updateMode = {updateMode}
            flipUpdateMode = {flipUpdateMode}
          />
      </div>
      </div>
  )
}

export default GlobalStatisticsPage
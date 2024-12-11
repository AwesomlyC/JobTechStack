import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../styles/GlobalStatisticsPage.css'
function GlobalStatisticsPage() {

    const [globalStatistics, setGlobalStatistics] = useState({});
    const [hasRetrieve, setHasRetrieve] = useState(false);
    const [numberOfDocuments, setNumberOfDocuments] = useState(0);


    useEffect( () => {
        if (hasRetrieve){
            console.log("CALLED");
            return;
        }
        const retrieveGlobalStatistics = async () => {
            await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/global-statistics`,
            ).then(response => { 
              console.log(response.data);
              setGlobalStatistics(response.data.sortedDict);
              setNumberOfDocuments(response.data.length);
              setHasRetrieve(true);
            }).catch(error => {
              console.error("Error when retrieving global statistics ---",  error);
            });
          };
          retrieveGlobalStatistics();
    }, [hasRetrieve])
  return (
      <div>
          <h1>Global Statistics for <text style={{ color: 'blue' }}>{numberOfDocuments}</text> documents</h1>
          <div className='content'>
              <div className='result'>
                  {Object.entries(globalStatistics).map(([key, value]) =>
                      <div>
                          {key} - {value}
                      </div>
                  )}
              </div>
          </div>
      </div>
  )
}

export default GlobalStatisticsPage
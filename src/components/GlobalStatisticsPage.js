import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../styles/GlobalStatisticsPage.css'
function GlobalStatisticsPage() {

    const [globalStatistics, setGlobalStatistics] = useState({});
    const [hasRetrieve, setHasRetrieve] = useState(false);
    const [numberOfDocuments, setNumberOfDocuments] = useState(0);
    const [relevantCompanyInformation, setRelevantCompanyInformation] = useState([]);


    useEffect( () => {
        if (hasRetrieve){
            console.log("CALLED");
            return;
        }
        const retrieveGlobalStatistics = async () => {
            await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/global-statistics`,
            ).then(response => { 
              setGlobalStatistics(response.data.sortedDict);
              setNumberOfDocuments(response.data.length);
              setRelevantCompanyInformation(response.data.relevantInformation);
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

          <div className='table-job-information'>
                <table>
                  <tr className='table-headers'>
                    <th className='table-number'>No.</th>
                    <th className='table-name'>Company Name</th>
                    <th className='table-title'>Job Title</th>
                    <th className='table-location'>Location</th>
                    <th className='table-date'>Date Submitted</th>
                    <th className='table-url'>URL</th>
                  </tr>
                  {relevantCompanyInformation.map( 
                    (info, index) => (
                      <tr key={index} className='table-result-row'>
                        <th>{index + 1}</th>
                        <th>{info.companyName}</th>
                        <th>{info.jobTitle}</th>
                        <th>{info.companyLocation === "United_States" ? "United States" : info.companyLocation}</th>
                        <th>{info.dateOfSubmission}</th>
                        <th>
                          <a href={info.companyURL} className='row-url'>
                            {info.companyURL}
                          </a>
                        </th>
                      </tr>
                    )
                    )}
                </table>

          </div>
      </div>
  )
}

export default GlobalStatisticsPage
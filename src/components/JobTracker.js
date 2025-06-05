import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/JobTracker.css";
import GlobalCompanyInformation from "./GlobalCompanyInformation";
import SearchFields from "./SearchFields";
import LoadingSpinner from "./LoadingSpinner";
import { useUserContext } from "./UserProvider";

function JobTracker() {
  const [hasRetrieve, setHasRetrieve] = useState(false);
  const [relevantCompanyInformation, setRelevantCompanyInformation] =
    useState(null);
  const [notesMode, setNotesMode] = useState(false);
  const [displayResults, setDisplayResults] = useState([]);

  const [searchJobTitle, setSearchJobTitle] = useState("");
  const [searchCompany, setSearchCompany] = useState("");

  const userID = useUserContext();
  useEffect(() => {
    if (hasRetrieve || !userID) {
      return;
    }
    const retrieveGlobalStatistics = async () => {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/stats/global-statistics`,
          { userID: userID.id }
        )
        .then((response) => {
          setInformation(response.data);
          setHasRetrieve(true);
          const filterCompany = searchCompany
            .trimEnd()
            .trimStart()
            .toLowerCase();
          const filterJob = searchJobTitle.trimEnd().trimStart().toLowerCase();

          setDisplayResults(
            response.data.relevantInformation.filter(
              (company) =>
                company.companyName.toLowerCase().includes(filterCompany) &&
                company.jobTitle.toLowerCase().includes(filterJob)
            )
          );
        })
        .catch((error) => {
          console.error("Error when retrieving global statistics ---", error);
        });
    };
    retrieveGlobalStatistics();
  }, [hasRetrieve, userID]);

  const setInformation = (data) => {
    // setNumberOfDocuments(data.length);
    setRelevantCompanyInformation(data.relevantInformation);
    setDisplayResults(data.relevantInformation);
  };
  const flipDeleteMode = () => {
    setNotesMode(false);
  };

  const flipUpdateMode = () => {
    setNotesMode(false);
  };

  const flipNotesMode = () => {
    setNotesMode((e) => !e);
  };

  if (!relevantCompanyInformation) {
    return (
      <div>
        <LoadingSpinner isLoading={!relevantCompanyInformation} />
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <SearchFields
        setDisplayResults={setDisplayResults}
        relevantCompanyInformation={relevantCompanyInformation}
        searchJobTitle={searchJobTitle}
        setSearchJobTitle={setSearchJobTitle}
        searchCompany={searchCompany}
        setSearchCompany={setSearchCompany}
      />
      <GlobalCompanyInformation
        relevantCompanyInformation={displayResults}
        setDisplayResults={setDisplayResults}
        setHasRetrieve={setHasRetrieve}
        flipDeleteMode={flipDeleteMode}
        flipUpdateMode={flipUpdateMode}
        notesMode={notesMode}
        flipNotesMode={flipNotesMode}
      />
    </div>
  );
}

export default JobTracker;

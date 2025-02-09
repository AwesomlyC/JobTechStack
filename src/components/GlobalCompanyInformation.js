import React, {useState} from 'react'
import { FaMinusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import DeleteModal from './DeleteModal'
import UpdateModal from './UpdateModal';
import NotesModal from './NotesModal';
function GlobalCompanyInformation({ relevantCompanyInformation, setDisplayResults, deleteMode, flipDeleteMode,
   setHasRetrieve, updateMode, flipUpdateMode, notesMode, flipNotesMode }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentDeleteInfo, setCurrentDeleteInfo] = useState({});

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentUpdateInfo, setCurrentUpdateInfo] = useState({});

  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [currentNotesInfo, setCurrentNotesInfo] = useState({});

  const [sorted, setSorted] = useState({sorted: "", reversed: false});

  const handleClose = () => {
    setDeleteModalOpen(false);
    setUpdateModalOpen(false);
    setNotesModalOpen(false);
  }

  const handleDeleteInfo = (info) => {
    setDeleteModalOpen(true);
    setCurrentDeleteInfo(info);
  }

  const handleUpdateInfo = (info) => {
    setUpdateModalOpen(true);
    setCurrentUpdateInfo(info);
  }

  const handleNotesInfo = (info) => {
    setNotesModalOpen(true);
    setCurrentNotesInfo(info);
  }

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    } 
    return <FaArrowDown />;
  }

  const sortByName = () => {
    const relevantCompanyCopy = [...relevantCompanyInformation];
    relevantCompanyCopy.sort((companyA, companyB) => {
      const nameA = companyA.companyName.trimStart().trimEnd();
      const nameB = companyB.companyName.trimStart().trimEnd();
      if (sorted.reversed){
        return nameB.localeCompare(nameA);
      }
      return nameA.localeCompare(nameB);
      
    });
    setDisplayResults(relevantCompanyCopy);
    setSorted({ sorted: "name", reversed: !sorted.reversed });
  }

  const sortByTitle = () =>{
    const relevantCompanyCopy = [...relevantCompanyInformation];
    relevantCompanyCopy.sort((companyA, companyB) => {
      const titleA = companyA.jobTitle.trimStart().trimEnd();
      const titleB = companyB.jobTitle.trimStart().trimEnd();
      if (sorted.reversed){
        return titleB.localeCompare(titleA);
      }
      return titleA.localeCompare(titleB);
      
    });
    setDisplayResults(relevantCompanyCopy);
    setSorted({ sorted: "title", reversed: !sorted.reversed });

  }

  const sortByLocation = () => {
    const relevantCompanyCopy = [...relevantCompanyInformation];
    relevantCompanyCopy.sort((companyA, companyB) => {
      const locationA = companyA.companyLocation.trimStart().trimEnd();
      const locationB = companyB.companyLocation.trimStart().trimEnd();
      if (sorted.reversed){
        return locationB.localeCompare(locationA);
      }
      return locationA.localeCompare(locationB);
      
    });
    setDisplayResults(relevantCompanyCopy);
    setSorted({ sorted: "location", reversed: !sorted.reversed });
  }

  const sortByDate = () => {
    console.log("CALLED sortByDate - ", sorted);
    const relevantCompanyCopy = [...relevantCompanyInformation];
    relevantCompanyCopy.sort((companyA, companyB) => {
      const dateA = companyA.dateOfSubmission.trimStart().trimEnd();
      const dateB = companyB.dateOfSubmission.trimStart().trimEnd();
      if (!sorted.reversed){
        return dateB.localeCompare(dateA);
      }
      return dateA.localeCompare(dateB);
      
    });
    setDisplayResults(relevantCompanyCopy);
    setSorted({sorted: "date", reversed: !sorted.reversed});
  }
  return (
    <div className='table-job-information'>
      <table className='table-table'>
        <tbody>
          <tr className='table-headers'>

            {/* {deleteMode && (<th className='table-action'></th>)}
            {updateMode && (<th className='table-action'></th>)} */}

            <th className='table-number'>No.</th>
            <th className='table-name' id='table-sort' onClick={sortByName}>
              <span style={{ marginRight: 10 }}>Company Name</span>
              {sorted.sorted === "name" ? renderArrow() : null}
              
            </th>
            <th className='table-title' id='table-sort' onClick={sortByTitle}>
              <span style={{ marginRight: 10 }}>Job Title</span>
              {sorted.sorted === "title" ? renderArrow() : null}

              </th>

            <th className='table-location' id='table-sort' onClick={sortByLocation}>
              <span style={{ marginRight: 10 }}>Location</span>
              {sorted.sorted === "location" ? renderArrow() : null}

              </th>

            <th className='table-date' id='table-sort' onClick={sortByDate}>
              <span style={{ marginRight: 10 }}>Date Submitted</span>
              {sorted.sorted === "date" ? renderArrow() : null}

              </th>
            {/* <th className='table-url'>URL</th> */}
            <th className='table-notes'>Notes</th>

          </tr>
        </tbody>
        {relevantCompanyInformation.map(
          (info, index) => (
            <tbody key={index}>
              <tr key={index} className='table-result-row'>
                {/* {deleteMode && (
                  <td className='row-action'>
                    {<FaMinusCircle onClick= {() => handleDeleteInfo(info)} />}
                  </td>
                )}
                {updateMode && (
                  <td className='row-action'>
                    <FaRegEdit onClick={() => handleUpdateInfo(info)} />
                  </td>
                )} */}
                <td className='table-result-data'>{index + 1}</td>

                <td className='table-result-data'>
                  
                  {/* <a href={info.companyURL}>{info.companyName}</a> */}
                  <text className='open-modal-text' onClick={() => handleUpdateInfo(info)}>{info.companyName}</text>
                  
                  </td>
                <td className='table-result-data'>{info.jobTitle}</td>
                <td className='table-result-data'>{info.companyLocation === "United_States" ? "United States" : info.companyLocation}</td>
                <td className='table-result-data table-date-of-submission'>{info.dateOfSubmission}</td>
                {/* DEPRECATED */}
                {/* <td className='table-result-data'>
                  <a href={info.companyURL} className='row-url'>
                    {info.companyURL}
                  </a>
                </td> */}
                <td className='table-result-note'>
                <FaNoteSticky onClick={() => handleNotesInfo(info)} />
                </td>
              </tr>
            </tbody>

          )
        )}
      </table>
        <UpdateModal 
          isOpen={updateModalOpen}
          onClose={handleClose}
          flipUpdateMode={flipUpdateMode}
          setHasRetrieve={setHasRetrieve}
          currentUpdateInfo={currentUpdateInfo}
          setCurrentUpdateInfo={setCurrentUpdateInfo}
        />
      <DeleteModal 
        isOpen={deleteModalOpen} 
        onClose={handleClose} 
        flipDeleteMode = {flipDeleteMode} 
        setHasRetrieve={setHasRetrieve} 
        currentDeleteInfo = {currentDeleteInfo}
        setCurrentDeleteInfo = {setCurrentDeleteInfo}
      />

      <NotesModal
        isOpen={notesModalOpen}
        onClose={handleClose}
        flipNotesMode={flipNotesMode}
        setHasRetrieve={setHasRetrieve}
        currentNotesInfo={currentNotesInfo}
      />

    </div>
  )
}

export default GlobalCompanyInformation
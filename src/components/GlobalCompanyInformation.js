import React, {useState} from 'react'
import { FaMinusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

import DeleteModal from './DeleteModal'
import UpdateModal from './UpdateModal';
function GlobalCompanyInformation({ relevantCompanyInformation, deleteMode, flipDeleteMode,
   setHasRetrieve, updateMode, flipUpdateMode }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentDeleteInfo, setCurrentDeleteInfo] = useState({});

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentUpdateInfo, setCurrentUpdateInfo] = useState({});
  const handleClose = () => {
    setDeleteModalOpen(false);
    setUpdateModalOpen(false);
  }

  const handleDeleteInfo = (info) => {
    setDeleteModalOpen(true);
    setCurrentDeleteInfo(info);
  }

  const handleUpdateInfo = (info) => {
    setUpdateModalOpen(true);
    setCurrentUpdateInfo(info);
  }


  return (
    <div className='table-job-information'>
      <table className='table-table'>
        <tbody>
          <tr className='table-headers'>

            {deleteMode && (<th className='table-action'></th>)}
            {updateMode && (<th className='table-action'></th>)}

            <th className='table-number'>No.</th>
            <th className='table-name'>Company Name</th>
            <th className='table-title'>Job Title</th>
            <th className='table-location'>Location</th>
            <th className='table-date'>Date Submitted</th>
            <th className='table-url'>URL</th>
          </tr>
        </tbody>
        {relevantCompanyInformation.map(
          (info, index) => (
            <tbody key={index}>
              <tr key={index} className='table-result-row'>
                {deleteMode && (
                  <td className='row-action'>
                    {<FaMinusCircle onClick= {() => handleDeleteInfo(info)} />}
                  </td>
                )}
                {updateMode && (
                  <td className='row-action'>
                    <FaRegEdit onClick={() => handleUpdateInfo(info)} />
                  </td>
                )}
                <td className='table-result-data'>{index + 1}</td>
                <td className='table-result-data'>{info.companyName}</td>
                <td className='table-result-data'>{info.jobTitle}</td>
                <td className='table-result-data'>{info.companyLocation === "United_States" ? "United States" : info.companyLocation}</td>
                <td className='table-result-data table-date-of-submission'>{info.dateOfSubmission}</td>
                <td className='table-result-data'>
                  <a href={info.companyURL} className='row-url'>
                    {info.companyURL}
                  </a>
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

    </div>
  )
}

export default GlobalCompanyInformation
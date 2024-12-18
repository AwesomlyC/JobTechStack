import React, {useState} from 'react'
import { FaMinusCircle } from "react-icons/fa";
import DeleteModal from './DeleteModal'
function GlobalCompanyInformation({ relevantCompanyInformation, deleteMode, flipDeleteMode, setHasRetrieve }) {
  const [open, setOpen] = useState(false);
  const [currentDeleteInfo, setCurrentDeleteInfo] = useState({});
  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = (info) => {
    setOpen(true);
    setCurrentDeleteInfo(info);
  }


  return (
    <div className='table-job-information'>
      <table className='table-table'>
        <tr className='table-headers'>

          {deleteMode && (<th className='table-delete'></th>)}
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
              {deleteMode && (
                <td className='row-delete'>
                  {/* <FaMinusCircle onClick={() => deleteID(info)} /> */}
                  {<FaMinusCircle onClick= {() => handleOpen(info)} />}
                </td>
              )}
              <td className='table-result-data'>{index + 1}</td>
              <td className='table-result-data'>{info.companyName}</td>
              <td className='table-result-data'>{info.jobTitle}</td>
              <td className='table-result-data'>{info.companyLocation === "United_States" ? "United States" : info.companyLocation}</td>
              <td className='table-result-data'>{info.dateOfSubmission}</td>
              <td className='table-result-data'>
                <a href={info.companyURL} className='row-url'>
                  {info.companyURL}
                </a>
              </td>
            </tr>
          )
        )}
      </table>

      <DeleteModal 
        isOpen={open} 
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
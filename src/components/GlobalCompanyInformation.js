import React from 'react'
import { FaMinusCircle } from "react-icons/fa";
function GlobalCompanyInformation({relevantCompanyInformation, deleteMode}) {

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
            {deleteMode && (<td className='row-delete'><FaMinusCircle /></td>)}
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

</div>
  )
}

export default GlobalCompanyInformation
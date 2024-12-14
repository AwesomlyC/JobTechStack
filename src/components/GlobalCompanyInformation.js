import React from 'react'

function GlobalCompanyInformation({relevantCompanyInformation}) {
  return (
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
  )
}

export default GlobalCompanyInformation
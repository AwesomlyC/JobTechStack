import React, { useState } from 'react'
import "./../styles/SearchFields.css"

function SearchFields({setDisplayResults, relevantCompanyInformation}) {

  const [searchJobTitle, setSearchJobTitle] = useState('');
  const [searchCompany, setSearchCompany] = useState('');
  

  const filterSearch = (event) => {

    if (event.type === "keyup" && (searchJobTitle !== ""  || searchCompany !== "")){
      const filterCompany = searchCompany.trimEnd().trimStart().toLowerCase();
      const filterJob = searchJobTitle.trimEnd().trimStart().toLowerCase();

      setDisplayResults(relevantCompanyInformation.filter(
        (company) => (company.companyName.toLowerCase().includes(filterCompany) &&
                      company.jobTitle.toLowerCase().includes(filterJob)))
      )
    } else{
      setDisplayResults(relevantCompanyInformation);
    }
  }

  const handleCompany = (event) => {
    setSearchCompany(event.target.value);
  }

  const handleJobTitle = (event) => {
    setSearchJobTitle(event.target.value);
  }
  return (
    <div className='filter-field-container'>
      <input
        type='text'
        placeholder='Filter by Company Name...'
        className='filter-field'
        onChange={handleCompany}
        value={searchCompany}
        onKeyUp={filterSearch}
      />
      
      <input
        type='text'
        placeholder='Filter by Job Title...'
        className='filter-field'
        onChange={handleJobTitle}
        value={searchJobTitle}
        onKeyUp={filterSearch}
      />
    </div>
  )
}

export default SearchFields
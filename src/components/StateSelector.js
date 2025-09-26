import React from 'react'
import Select from 'react-select';
function StateSelector({companyLocation, setCompanyLocation}) {
    const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming", "Remote", "United States of America"
    ];
  const stateOptions = US_STATES.map(state => ({
  value: state,
  label: state
}));
const handleChange = (selectedOption) => {

    setCompanyLocation(selectedOption);
}

  return (
      <Select
        defaultValue={companyLocation}
        isSearchable={true}
        options={stateOptions}
        onChange={handleChange}
      />
  );
}

export default StateSelector
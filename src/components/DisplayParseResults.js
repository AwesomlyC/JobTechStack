import React from 'react'

function DisplayParseResults({wordMap}) {
  return (
    <div className='result'>
    {Object.entries(wordMap).map( ([key,value]) =>
        <div>
            {key} - {value}
        </div>   
    )}
</div>
  )
}

export default DisplayParseResults
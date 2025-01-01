import React from 'react'
import './../styles/LoadingSpinner.css'
function LoadingSpinner() {
  return (
    <div id='loader-container'>
      <div className='loader' />
      <text className='loader-text'>Loading...</text>
    </div>
  )
}

export default LoadingSpinner
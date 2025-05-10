import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './../styles/LoadingSpinner.css'
function LoadingSpinner({isLoading = true}) {
  const navigate = useNavigate();
  useEffect(() => {
    let timeoutId = 0;

    // In the event the suer is not signed in or error has occurred.
    if (isLoading) {
      timeoutId = setTimeout(() => {
        navigate('/');  // Navigate back to home page
      }, 7000); // 7 seconds
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, navigate]);


  return (
    <div id='loader-container'>
      <div className='loader' />
      <text className='loader-text'>Loading...</text>
    </div>
  )
}

export default LoadingSpinner
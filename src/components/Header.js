import React from 'react'
import '../styles/Header.css'
function Header() {
  return (
    <navbar
      className='navbar'
    >

      <a href={`${process.env.REACT_APP_HOME_PAGE}`}><strong>JobTechStack</strong></a>
      <button
        className='navbar-button'
      >
        Global Stats
      </button>
    </navbar>
  )
}

export default Header
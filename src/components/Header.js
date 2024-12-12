import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'

import '../styles/Header.css'

function Header() {
  const navigate = useNavigate();
  return (
    <navbar
      className='navbar'
    >

      <a href='/'><strong>JobTechStack</strong></a>
      <button
        className='navbar-button'
        onClick={() => {navigate('/global-statistics')}}
      >
        Global Statistics
      </button>
    </navbar>
  )
}

export default Header
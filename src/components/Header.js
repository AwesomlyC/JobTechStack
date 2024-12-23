import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'

import '../styles/Header.css'

function Header() {
  const navigate = useNavigate();
  return (
    <navbar className='navbar'>

      <a href='/'><strong>JobTechStack</strong></a>
      <div>
        <button
          className='navbar-button'
          onClick={() => { navigate('/global-statistics') }}
        >
          Global Statistics
        </button>
        <button
          className='navbar-button'
          onClick={() => { navigate('/analytics') }}
        >
          Analytics
        </button>
      </div>
    </navbar>
  )
}

export default Header
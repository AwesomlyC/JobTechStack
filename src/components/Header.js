import React from 'react'
import { useNavigate } from 'react-router'
import {SignedIn, SignedOut} from '@clerk/clerk-react';
import '../styles/Header.css'

function Header() {
  const navigate = useNavigate();
  console.log(SignedIn);
  return (
    <navbar className='navbar'>

      <a href='/' className='home-page'><strong>JobTechStack</strong></a>
      <div>
        <SignedIn>
        <button
          className='navbar-button'
          onClick={() => { navigate('/main') }}
        >
          Home
        </button>

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
        </SignedIn>
        
        <SignedOut>
        <button
          className='navbar-button'
          onClick={() => { navigate('/') }}
        >
          Sign Up
        </button>

        </SignedOut>

        <button
          className='navbar-button'
          onClick={() => { navigate('/about') }}
        >
          About
        </button>
      </div>
    </navbar>
  )
}

export default Header
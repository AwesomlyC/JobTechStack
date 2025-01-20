import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './../styles/Sidebar.css'
import {SignedIn} from '@clerk/clerk-react';



// Icon Imports - react-icons
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import { FaInfoCircle, FaHome, FaRegListAlt } from "react-icons/fa";
import { GiPieChart } from "react-icons/gi";
import { VscGraphLine } from "react-icons/vsc";
import { FaTable } from "react-icons/fa6";

function Sidebar() {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded((e => !e));
  }
  return (
    <SignedIn>
      <aside className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
        <button className='sidebar-toggle-button' onClick={toggleSidebar}>
          {isExpanded ? <BiArrowToLeft /> : <BiArrowToRight />}
        </button>
        <div className='sidebar-content'>
          {isExpanded ? (
            <div className='sidebar-button-options'>
              <button
                className='sidebar-button'
                onClick={() => { navigate('/main') }}
              >
                Home
              </button>
  
              <button
                className='sidebar-button'
                onClick={() => { navigate('/keyword-list') }}
              >
                Keyword List
              </button>
  
              <button
                className='sidebar-button'
                onClick={() => { navigate('/job-tracker') }}
              >
                Job Tracker
              </button>
  
              <button
                className='sidebar-button'
                onClick={() => { navigate('/pie-chart') }}
              >
                Pie Chart
              </button>
  
              <button
                className='sidebar-button'
                onClick={() => { navigate('/line-graph') }}
              >
                Line Graph
              </button>
  
              <div className='sidebar-about'>
                <button
                  className='sidebar-button'
                  onClick={() => { navigate('/about') }}
                >
                  About
                </button>
              </div>
            </div>
          ) : (
  
            <>
              <div className='sidebar-icon'>
                <FaHome
                    title="Home"
                    onClick={() => { navigate('/main') }}
                  />
                  <FaRegListAlt
                    title="Job Application Tracker"
                    onClick={() => {navigate('/job-tracker')}}
                  />
                  <FaTable 
                    title="Technical Keyword Table" 
                    onClick={() => {navigate('/keyword-list')}}
                  />
                  <GiPieChart 
                    title="Pie Charts" 
                    onClick={() => {navigate('/pie-chart')}}
  
                  />
                  <VscGraphLine 
                    title="Line Chart" 
                    onClick={() => {navigate('/line-graph')}}
  
                  />
              </div>
  
              <div className='sidebar-about'>
                <FaInfoCircle 
                  title="About"
                  onClick={() => {navigate('/about')}} 
                />
              </div>
            </>
  
          )}
  
  
        </div>
  
      </aside>
    </SignedIn>
  )
}

export default Sidebar
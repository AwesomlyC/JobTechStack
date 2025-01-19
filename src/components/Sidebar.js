import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './../styles/Sidebar.css'

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
              onClick={() => { navigate('/global-statistics') }}
            >
              Statistics
            </button>

            <button
              className='sidebar-button'
              onClick={() => { navigate('/global-statistics') }}
            >
              Job Tracker
            </button>

            <button
              className='sidebar-button'
              onClick={() => { navigate('/analytics') }}
            >
              Pie Chart
            </button>

            <button
              className='sidebar-button'
              onClick={() => { navigate('/analytics') }}
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
                  onClick={() => {navigate('/global-statistics')}}
                />
                <FaTable 
                  title="Technical Keyword Table" 
                  onClick={() => {navigate('/global-statistics')}}
                />
                <GiPieChart 
                  title="Pie Charts" 
                  onClick={() => {navigate('/analytics')}}

                />
                <VscGraphLine 
                  title="Line Chart" 
                  onClick={() => {navigate('/analytics')}}

                />
            </div>

            <div className='sidebar-about'>
              <FaInfoCircle title="About" />
            </div>
          </>

        )}


      </div>

    </aside>
  )
}

export default Sidebar
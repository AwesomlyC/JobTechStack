import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import './../styles/Sidebar.css'
import {SignedIn} from '@clerk/clerk-react';



// Icon Imports - react-icons
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import { FaInfoCircle, FaHome, FaRegListAlt, FaSuitcase } from "react-icons/fa";
import { GiPieChart } from "react-icons/gi";
import { VscGraphLine } from "react-icons/vsc";
import { FaTable } from "react-icons/fa6";

function Sidebar() {
  const navigate = useNavigate();
  const urlPath = useLocation()

  const [isExpanded, setIsExpanded] = useState(false);
  const [highlight, setHighlight] = useState(urlPath ? urlPath.pathname : '');

  const toggleSidebar = () => {
    setIsExpanded((e => !e));
  }
  
  useEffect(() => {
    // console.log(urlPath);
    setHighlight(urlPath ? urlPath.pathname : '');
  }, [urlPath]);
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
                id = {highlight === '/home' ? 'highlight' : ""}
                onClick={() => { navigate('/home'); setHighlight('/home') }}
              >
                Home
              </button>
  
              <button
                className='sidebar-button'
                id = {highlight === '/main' ? 'highlight' : ""}
                onClick={() => { navigate('/main'); setHighlight('/main') }}
              >
                Input Job
              </button>
  
  
              <button
                className='sidebar-button'
                id = {highlight === '/job-tracker' ? 'highlight' : ""}
                onClick={() => { navigate('/job-tracker'); setHighlight('/job-tracker') }}
              >
                Job Tracker
              </button>

              <button
                className='sidebar-button'
                id = {highlight === '/keyword-list' ? 'highlight' : ""}
                onClick={() => { navigate('/keyword-list'); setHighlight('/keyword-list') }}
              >
                Keyword List
              </button>
              
              <button
                className='sidebar-button'
                id = {highlight === '/pie-chart' ? 'highlight' : ""}

                onClick={() => { navigate('/pie-chart'); setHighlight('/pie-chart') }}
              >
                Pie Chart
              </button>
  
              <button
                className='sidebar-button'
                id = {highlight === '/line-graph' ? 'highlight' : ""}

                onClick={() => { navigate('/line-graph'); setHighlight('/line-graph') }}
              >
                Line Graph
              </button>
  
              <div className='sidebar-about'>
                <button
                  className='sidebar-button'
                  id = {(highlight === '/about' || highlight === '/') ? 'highlight' : ""}
                  onClick={() => { navigate('/about'); setHighlight('/about') }}
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
                    id = {highlight === '/home' ? 'highlight' : ""}
                    onClick={() => { navigate('/home'); setHighlight('/home') }}
                  />

                <FaSuitcase
                    title="Input Job"
                    id = {highlight === '/main' ? 'highlight' : ""}

                    onClick={() => { navigate('/main'); setHighlight('/main') }}
                  />

                  <FaRegListAlt
                    title="Job Application Tracker"
                    id = {highlight === '/job-tracker' ? 'highlight' : ""}

                    onClick={() => {navigate('/job-tracker'); setHighlight('/job-tracker')}}
                  />

                  <FaTable 
                    title="Technical Keyword Table" 
                    id = {highlight === '/keyword-list' ? 'highlight' : ""}

                    onClick={() => {navigate('/keyword-list'); setHighlight('/keyword-list')}}
                  />

                  <GiPieChart 
                    title="Pie Charts" 
                    id = {highlight === '/pie-chart' ? 'highlight' : ""}

                    onClick={() => {navigate('/pie-chart'); setHighlight('/pie-chart')}}
  
                  />
                  <VscGraphLine 
                    title="Line Chart" 
                    id = {highlight === '/line-graph' ? 'highlight' : ""}

                    onClick={() => {navigate('/line-graph'); setHighlight('/line-graph')}}
  
                  />
              </div>
  
              <div className='sidebar-about'>
                <FaInfoCircle 
                  title="About"
                  id = {(highlight === '/about' || highlight === '/') ? 'highlight' : ""}
                  onClick={() => {navigate('/about'); setHighlight('/about')}} 
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
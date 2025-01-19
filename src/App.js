import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {lazy, createContext, useContext, useState} from 'react';
import {SignedIn, SignedOut, RedirectToSignIn, useUser} from "@clerk/clerk-react"
import ClerkUserIcon from './components/ClerkUserIcon';
import UserProvider from './components/UserProvider';

const MainPage = lazy(() => import('./components/MainPage'));
const GlobalStatisticsPage = lazy(() => import('./components/GlobalStatisticsPage'));
const AnalyticsPage = lazy(() => import('./components/AnalyticsPage'));
const SignInPage = lazy(() => import('./components/SignInPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
<div className='main-container'>
          <Sidebar />
          <UserProvider>
            <Routes>
              <Route path='/' Component={SignInPage} />
              <Route path='/main' Component={MainPage} />
              <Route path='/global-statistics' Component={GlobalStatisticsPage} />
              <Route path='/analytics' Component={AnalyticsPage} />
              <Route path='/about' Component={AboutPage} />
  
            </Routes>
            <ClerkUserIcon />
          </UserProvider>
</div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

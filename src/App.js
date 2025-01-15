import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {lazy, createContext, useContext, useState} from 'react';
import {SignedIn, SignedOut, RedirectToSignIn, useUser} from "@clerk/clerk-react"
import ClerkUserIcon from './components/ClerkUserIcon';
import UserProvider from './components/UserProvider';

const MainPage = lazy(() => import('./components/MainPage'));
const GlobalStatisticsPage = lazy(() => import('./components/GlobalStatisticsPage'));
const AnalyticsPage = lazy(() => import('./components/AnalyticsPage'));
const SignInPage = lazy(() => import('./components/SignInPage'));

function App() {
  // const {isSignedIn, user} = useUser();
  // console.log(isSignedIn);

  // if (user){
  //   console.log(user.id);
  // }
  return (
    <div>
      <BrowserRouter>
        <Header />
        <UserProvider>
          <Routes>
            <Route path='/' Component={SignInPage} />
            <Route path='/main' Component={MainPage} />
            <Route path='/global-statistics' Component={GlobalStatisticsPage} />
            <Route path='/analytics' Component={AnalyticsPage} />
          </Routes>
          <ClerkUserIcon />
        </UserProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

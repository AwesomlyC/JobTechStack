import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {lazy} from 'react';
// import {SignedIn, SignedOut, RedirectToSignIn, useUser} from "@clerk/clerk-react"
import ClerkUserIcon from './components/ClerkUserIcon';
import UserProvider from './components/UserProvider';

const MainPage = lazy(() => import('./components/MainPage'));
const GlobalStatisticsPage = lazy(() => import('./components/GlobalStatisticsPage'));
// const AnalyticsPage = lazy(() => import('./components/AnalyticsPage'));
const PieChartPage = lazy(() => import('./components/PieChartPage'));
const LineGraphPage = lazy(() => import('./components/LineGraphPage'));

const SignInPage = lazy(() => import('./components/SignInPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));


function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
          <Sidebar />
          <UserProvider>
            <Routes>
              <Route path='/' Component={SignInPage} />
              <Route path='/main' Component={MainPage} />

              <Route path='/global-statistics' Component={GlobalStatisticsPage} />
              <Route path='/pie-chart' Component={PieChartPage} />
              <Route path='/line-graph' Component={LineGraphPage} />

              <Route path='/about' Component={AboutPage} />
            </Routes>
            <ClerkUserIcon />
          </UserProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

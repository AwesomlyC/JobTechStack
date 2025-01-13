import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {lazy} from 'react';

const MainPage = lazy(() => import('./components/MainPage'));
const GlobalStatisticsPage = lazy(() => import('./components/GlobalStatisticsPage'));
const AnalyticsPage = lazy(() => import('./components/AnalyticsPage'));

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
          <Routes>
            <Route path ='/' Component={MainPage} />
            <Route path='/global-statistics' Component = {GlobalStatisticsPage} />
            <Route path='/analytics' Component =  {AnalyticsPage} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

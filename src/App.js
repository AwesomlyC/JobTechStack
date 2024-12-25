import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import GlobalStatisticsPage from './components/GlobalStatisticsPage';
import AnalyticsPage from './components/AnalyticsPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      </BrowserRouter>
    </div>
  );
}

export default App;

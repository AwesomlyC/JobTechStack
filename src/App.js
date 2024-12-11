import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import GlobalStatisticsPage from './components/GlobalStatisticsPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path ='/' Component={MainPage} />
        <Route path='/global-statistics' Component = {GlobalStatisticsPage} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

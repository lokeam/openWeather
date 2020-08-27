import React from 'react';
import { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Alert from './components/Alert/Alert';
import CurrentView from './components/CurrentView/CurrentView';
import ForecastView from './components/ForecastView/ForecastView';

import './App.css';

function App() {
  const [status, setStatus] = useState('start');
  const [geoData, setGeoData] = useState({});
  const [geoStatus, setGeoStatus] = useState('idle');
  const [page, setPage] = useState('currentWeather');

  // handler to get geographic coordinates for api call
  const handleGeoData = () => {
    setStatus('loadingGeoData');

    const getCoordinates = () => {

      if (navigator.geolocation) {
  
        localStorage.setItem('location-allowed', true);
        setGeoStatus('fetching');
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
        
      } else {
        setGeoStatus('unsupported');
        alert('Either your browser does not support location tracking, or we don\'t have permission to access it.');
      }
    }

    async function returnCoordinates() {
      try {
        const position = await getCoordinates();
        setGeoData({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });

        setStatus('fetchingWeatherData');
      } catch (err) {
        console.error(err.message);
      }
    }

    returnCoordinates();
  }
  
  return (
    <div className="App">
      <div className="weather-card">
        <NavBar setPage={ setPage } />
          <div className="weather-container">
            { status === 'start' && <Alert handleGeoData={ handleGeoData}  /> }
            { status === 'fetchingWeatherData' && <CurrentView geoData={ geoData } page={page} />  }
            { page === 'fiveDayForecast' && <ForecastView geoData={ geoData } page={page} /> }
          </div>
      </div>
    </div>
  );
}

export default App;

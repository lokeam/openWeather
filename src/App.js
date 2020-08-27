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

   
  console.log('app, status: ', status);

  // handler to get geographic coordinates for api call
  const handleGeoData = () => {
    console.log('handleGeoData');
    setStatus('loadingGeoData');

    const getCoordinates = () => {
      console.log('getCoordinates');
      if (navigator.geolocation) {
        console.log('geo ok');
  
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

        console.log(position);
        setStatus('fetchingWeatherData');
      } catch (err) {
        console.error(err.message);
      }
    }

    returnCoordinates();
  }
  console.log('testing geoData: ', geoData);
  console.log('testing geoStatus: ', geoStatus);
  
  return (
    <div className="App">
      <div className="weather-card">
        <NavBar setPage={ setPage } />
          { status === 'start' && <Alert handleGeoData={ handleGeoData}  /> }
          { status === 'fetchingWeatherData' && <CurrentView geoData={ geoData } setPage={setPage} />  }
          { page === 'fiveDayForecast' && <ForecastView geoData={ geoData } setPage={setPage} /> }
      </div>
    </div>
  );
}

export default App;

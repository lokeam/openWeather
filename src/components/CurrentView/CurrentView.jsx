import React from 'react';
import useFetch from '../../helpers/useFetch';
import moment from 'moment'
import './current.css';

function CurrentView( {geoData} ) {

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
  const { status, data, error } = useFetch(url);
  let currentDateTime = moment().format('MMMM Do YYYY');

  console.log('CurrentView, fetch data: ', data);
  console.log('CurrentView, fetch status: ', status);
  console.log('CurrentView, currentDateTime: ', currentDateTime);

  return (
    <div className="weather-container--current">
      <h2>Current Forecast View</h2>
    </div>
  )
};

export default CurrentView;
import React from 'react';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import useFetch from '../../helpers/useFetch';
import moment from 'moment'
import './current.css';

function CurrentView({ geoData }) {

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
  const { status, data, error } = useFetch(url);
  let currentDateTime = moment().format('MMMM Do YYYY');

  console.log('CurrentView, fetch data: ', data);
  console.log('CurrentView, fetch status: ', status);
  console.log('CurrentView, currentDateTime: ', currentDateTime);

  return (
    <div className="weather-container--current">
      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'fetched' && (
        <>
          <p className="weather-card--name">{data.name}</p>
          <p className="weather-card--date">{currentDateTime}</p>
          <div className="weather-container--data">
            <div className="weather-container__description">
              <WeatherIcon icon={data.weather[0].icon} />
              <p>{data.weather[0].description}</p>
            </div>
            <div className="weather-container__temp-data">
              <p className="weather-container__min-max-temp">{Math.ceil(data.main.temp_max)}&deg;&uarr; {Math.ceil(data.main.temp_min)}&deg;&darr;</p>
              <p className="weather-container__current-temp">{Math.ceil(data.main.temp)}&deg;</p>
              <p className="weather-container__approx">Feels like {Math.ceil(data.main.feels_like)}&deg;</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
};

export default CurrentView;
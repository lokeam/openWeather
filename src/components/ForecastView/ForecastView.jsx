import React from 'react';
import useFetch from '../../helpers/useFetch';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import moment from 'moment';
import './forecast.css';

function ForecastView({ geoData, page }) {

  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
  const { status, data, error } = useFetch(url, true);

  /* show and hide currently actives pages */
  let isHidden = page !== 'fiveDayForecast' ? 'hidden' : '';


  return (
    <div className={`weather-container--forecast ${isHidden}`}>
      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'fetched' && (
        <>
          <p className="weather-forecast__heading">Five day forecast</p>
          <div className="weather-forecast__results">
      <p className="weather-forecast__location">{data.city.name}, {data.city.country}</p>
            {
              data.list.map( item => {
                return (
                  <div key={item.name} className="weather-forecast__row">
                    <p className="weather-forecast__day">{moment(item.name).format("MMM D")}</p>
                    <ul className="weather-forecast__row-list">
                      {
                        item.weatherArray.map( ( forecastDay, index ) => {
                          return (
                            <li key={`${forecastDay.dt_txt}${index}`} className="weather-forecast__item">
                              <p className="weather-forecast__time">{moment(forecastDay.dt_txt).format('hA')}</p>
                              <p className="weather-forecast__min-max-temp">
                                <span className="weather-forecast__min-max-temp--high">{Math.ceil(forecastDay.main.temp_max)}&deg;</span> / {Math.ceil(forecastDay.main.temp_min)}&deg;
                              </p>
                              <WeatherIcon icon={forecastDay.weather[0].icon}/>
                              <p className="weather-forecast__description">{forecastDay.weather[0].description}</p>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                )
              })
            }
          </div>
        </>
      )}
    </div>
  )
};

export default ForecastView;
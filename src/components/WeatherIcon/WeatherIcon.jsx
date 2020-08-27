import React from 'react';

const WeatherIcon = ({ icon }) => {
  return (
    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
         alt="icon for weather"
         className="weather-icon"/>
  )
};

export default WeatherIcon;
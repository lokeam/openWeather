import React from 'react';
import './navbar.css';

function NavBar() {
  return (
    <nav className="nav__container">
      <ul className="nav__list">
        <li onClick={ () => console.log('currentWeather') } className="nav__list--item">Today</li>
        <li onClick={ () => console.log('fiveDayForecast') } className="nav__list--item">5 Days</li>
      </ul>
    </nav>
  )
};

export default NavBar;
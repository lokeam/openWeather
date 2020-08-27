import React from 'react';
import './navbar.css';

function NavBar({ setPage }) {
  return (
    <nav className="nav__container">
      <ul className="nav__list">
        <li onClick={ () => setPage('currentWeather') } className="nav__list--item">Today</li>
        <li onClick={ () => setPage('fiveDayForecast') } className="nav__list--item">5 Days</li>
      </ul>
    </nav>
  )
};

export default NavBar;
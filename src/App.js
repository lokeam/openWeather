import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Alert from './components/Alert/Alert';
import CurrentView from './components/CurrentView/CurrentView';
import ForecastView from './components/ForecastView/ForecastView';

import './App.css';

function App() {
  return (
    <div className="App">
        <NavBar />
        <Alert />
        <CurrentView />
        <ForecastView />
    </div>
  );
}

export default App;

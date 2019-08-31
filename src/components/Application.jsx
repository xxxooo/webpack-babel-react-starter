import React from 'react';
import './Application.scss';
import reactIcon from '../images/React.svg';

function Application() {
  return (
    <div className="app-container">
      <h1>Hello React!</h1>
      <img src={reactIcon} alt="react-icon" />
    </div>
  );
}

export default Application;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const reactRoot = document.getElementById('reactRoot');
reactRoot && ReactDOM.render(<App />, reactRoot)

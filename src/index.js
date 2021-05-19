import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import Hero from './components/hero';

ReactDOM.render(<App />, document.getElementById('title'));
ReactDOM.render(<Hero />, document.getElementById('root'));

reportWebVitals();

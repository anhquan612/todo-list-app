import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const params = new URLSearchParams(window.location.search);
var page = 1;
var tasksPerPage = 5;
if (params.has('page')) {
	page = params.get('page');
}
if (params.has('tasksPerPage')) {
	tasksPerPage = params.get('tasksPerPage');
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App page={ page } tasksPerPage = { tasksPerPage }/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

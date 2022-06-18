import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/';
axios.interceptors.request.use(config => {
  config.headers['X-Frame-Options'] = 'SAMEORIGIN'
  return config;
})
axios.interceptors.response.use(config => {
  config.headers['X-Frame-Options'] = 'SAMEORIGIN'
  return config;
})


const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common['Authorization'];
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  // </React.StrictMode>
);

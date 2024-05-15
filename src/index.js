import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import "../src/all.min.css";

import {Provider } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Usersdata from './context/Usecontext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Usersdata>
        <App />
      </Usersdata>

    </BrowserRouter>

  </React.StrictMode>
);

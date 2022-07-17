import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';


import MainPage from './Pages/Main/mainPage';
import { Store } from './Redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <MainPage />
    </Provider>
  </React.StrictMode>
);


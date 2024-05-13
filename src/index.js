import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import axiosInterceptor from './utils/axiosInterceptor';

const root = ReactDOM.createRoot(document.getElementById('root'));
axiosInterceptor();
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

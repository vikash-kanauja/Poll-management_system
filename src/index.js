import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axiosInterceptor from './utils/axiosInterceptor';
import Navbar from './Components/Navbar';
const root = ReactDOM.createRoot(document.getElementById('root'));
axiosInterceptor();
root.render(
  <BrowserRouter>
    <Provider store={store}>
    {/* <Navbar /> */}
      <App />
    </Provider>
  </BrowserRouter>
);

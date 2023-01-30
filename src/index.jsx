import React from 'react';
//import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './utils/store/store';
const root = ReactDOMClient.createRoot(
  document.getElementById('root')
);
root.render(
  <Provider store={store}>
    <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

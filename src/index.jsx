import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './utils/store/store';
import { BrowserRouter} from "react-router-dom";
const root = ReactDOMClient.createRoot(
document.getElementById('root')
);
root.render(
<Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>
);

reportWebVitals();
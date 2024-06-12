import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

const div: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(div);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

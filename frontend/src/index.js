import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Providers from 'Provider';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);

import './index.css';
import React from 'react';
import { App } from './App.jsx';
import ReactDOM from 'react-dom/client';
import { CurrencysProvider, ConversionProvider } from './contexts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConversionProvider>
      <CurrencysProvider>
        <App />
      </CurrencysProvider>
    </ConversionProvider>
  </React.StrictMode>,
);

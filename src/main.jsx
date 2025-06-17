import './index.css';
import React from 'react';
import { App } from './App.jsx';
import ReactDOM from 'react-dom/client';
import { SupportedCodesProvider } from './pages/conversion/contexts/SupportedCodesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupportedCodesProvider>
      <App />
    </SupportedCodesProvider>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import ManufacturersList from 'components/ManufacturersList';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ManufacturersList />
  </React.StrictMode>
);

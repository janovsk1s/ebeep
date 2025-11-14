import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MatrixProvider } from './hooks/useMatrixClient';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MatrixProvider>
      <App />
    </MatrixProvider>
  </React.StrictMode>
);

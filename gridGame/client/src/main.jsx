import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getStoredThemeId, storeThemeId } from './themes.js';
import App from './App.jsx';

storeThemeId(getStoredThemeId());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

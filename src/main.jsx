import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import '../tailwind.config'
import { BrowserRouter } from "react-router-dom";

import { AuthProvider }  from './contexts/AuthContext';
import { UserTravelAgencyProvider } from "./contexts/UserTravelAgencyContext";
import { UserStampProvider } from './contexts/UserStampContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserTravelAgencyProvider>
          <UserStampProvider>
            <App />
          </UserStampProvider>
        </UserTravelAgencyProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

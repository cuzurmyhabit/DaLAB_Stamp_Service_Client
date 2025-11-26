import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import '../tailwind.config'
import { BrowserRouter } from "react-router-dom";

import AuthProvider from './contexts/AuthContext';
import UserTravelAgencyProvider from "./contexts/UserTravelAgencyContext";
import UserStampProvider from './contexts/UserStampContext';
import TravelAgencyProvider from './contexts/TravelAgencyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TravelAgencyProvider>
        <UserTravelAgencyProvider>
          <UserStampProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserStampProvider>
        </UserTravelAgencyProvider>
      </TravelAgencyProvider>
    </AuthProvider>
  </React.StrictMode>
);

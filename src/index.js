import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import { AuthProvider } from "./components/useAuth/useAuth";
import { UserInfoProvider } from "./components/context/userContext";

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './components/useAuth/AuthProvider';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  
  <Router>

    <React.StrictMode>
        <AuthProvider>
        <UserInfoProvider>
          <Routes>

            {/* <App /> */}
            <Route path="/*" element={<App />} />
          </Routes>
        </UserInfoProvider>
        </AuthProvider>
  </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ForumProvider } from './contexts/ForumContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <ForumProvider>
    <Router>
    <App />
    </Router>
    </ForumProvider>
    </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

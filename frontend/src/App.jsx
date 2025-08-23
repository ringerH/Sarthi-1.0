// frontend/src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
// We'll create these components next
// import LoginPage from './LoginPage'; 
// import Dashboard from './Dashboard';

function App() {
    return (
        <div>
            <Routes>
                {/* Route 1: The root path shows the LandingPage */}
                <Route path="/" element={<LandingPage />} />

                {/* Add placeholders for other pages */}
                {/* <Route path="/login" element={<LoginPage />} /> */}
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </div>
    );
}

export default App;
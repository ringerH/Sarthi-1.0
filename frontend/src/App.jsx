// frontend/src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage'; // Import the new component
// import Dashboard from './Dashboard';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Add this line */}
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </div>
    );
}

export default App;
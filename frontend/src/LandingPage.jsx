// frontend/src/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Make sure to create and import the CSS file

function LandingPage() {
    return (
        <div className="landing-wrapper">
            <div className="landing-card">
                {/* Simple SVG Icon for visual appeal */}
                <div className="car-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 16.5V14a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2.5"/>
                        <path d="M14 14h4a2 2 0 0 1 2 2v2.5"/>
                        <path d="M22 17H2"/>
                        <path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                        <path d="M19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                        <path d="M14 9.5L16.5 7H20a2 2 0 0 1 2 2v1"/>
                        <path d="M6 12V8c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v4"/>
                    </svg>
                </div>

                <h1>Welcome to CampusConnect</h1>
                <p>Your one-stop solution for cab pooling and campus connections.</p>
                
                <div className="button-group">
                    <Link to="/login" className="btn btn-primary">
                        Login or Sign Up
                    </Link>
                    <Link to="/dashboard" className="btn btn-secondary">
                        Continue as Guest
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

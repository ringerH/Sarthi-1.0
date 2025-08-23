// frontend/src/LoginPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // We'll create this next

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the page from reloading
        // For now, we'll just log the data to the console
        console.log('Login attempt with:', { email, password });
        // Later, we'll send this data to our backend API
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Login</h2>
                <p>Enter your credentials to access your account.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary full-width">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
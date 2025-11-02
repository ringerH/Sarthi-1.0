// src/LoginPage.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google'; // 1. Import
import { useAuth } from './hooks/useAuth.js'; // 2. Import
import './LoginPage.css'; 

function LoginPage() {
    const [error, setError] = useState('');
    const { loginWithGoogle } = useAuth(); // 3. Get new function

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // 'credentialResponse.credential' is the ID token
            await loginWithGoogle(credentialResponse.credential);
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleError = () => {
        setError('Google login failed. Please try again.');
    };

    // 4. Replace your form with this
    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Welcome to Sarthi</h2>
                <p>Please sign in with your @iiitg.ac.in account.</p>
                
                {error && <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>}

                <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
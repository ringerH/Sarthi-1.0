import React, { useState, useEffect } from 'react';
import axios from 'axios';

// The base URL for our backend API
const API_URL = 'http://localhost:5001/api';

function StatusChecker() {
    const [status, setStatus] = useState('loading...');
    const [timestamp, setTimestamp] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // This function is called when the component mounts
        const fetchStatus = async () => {
            try {
                // Make a GET request to our backend's /status endpoint
                const response = await axios.get(`${API_URL}/status`);
                
                // Update state with the data from the backend
                setStatus(response.data.status);
                setTimestamp(response.data.timestamp);
                setError(null); // Clear any previous errors

            } catch (err) {
                // If the request fails, update the error state
                console.error("Failed to fetch backend status:", err);
                setStatus('error');
                setError('Could not connect to the backend.');
            }
        };

        fetchStatus();
    }, []); // The empty array [] means this effect runs only once

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Backend Health Check</h2>
            <p>
                <strong>Status:</strong> 
                <span style={{ color: status === 'ok' ? 'green' : 'red', fontWeight: 'bold' }}>
                    {status}
                </span>
            </p>
            {timestamp && <p><strong>Server Time:</strong> {new Date(timestamp).toLocaleString()}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default StatusChecker;

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000; // The gateway itself runs on port 3000

// 1. Proxy /api/auth -> http://localhost:5001/api/auth
app.use('/api/auth', createProxyMiddleware({
    target: 'http://localhost:5001', // Correct: Points to localhost
    changeOrigin: true
    // Correct: No pathRewrite, so /api/auth is passed through
}));

// 2. Proxy /api/rides -> http://localhost:5002/
app.use('/api/rides', createProxyMiddleware({
    target: 'http://localhost:5002', // Correct: Points to localhost
    changeOrigin: true,
    pathRewrite: { '^/api/rides': '/' }, // This one is correct
}));

// 3. Proxy /api/listings -> http://localhost:5000/api/listings
app.use('/api/listings', createProxyMiddleware({
    target: 'http://localhost:5000', // Correct: Points to localhost
    changeOrigin: true,
    pathRewrite: { '^/api/listings': '/api/listings' }, // This one is also correct
}));

app.listen(PORT, () => console.log(`API Gateway running locally on port ${PORT}`));
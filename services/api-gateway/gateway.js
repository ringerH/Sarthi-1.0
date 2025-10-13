const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Route /api/auth requests to the auth-service
app.use('/api/auth', createProxyMiddleware({
    target: 'http://auth-service:5001',
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '/' },
}));

// TODO: Add routes for other services here in the future

app.listen(PORT, () => console.log(`🚀 API Gateway on port ${PORT}`));
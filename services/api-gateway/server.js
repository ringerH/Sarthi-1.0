const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use('/api/auth', createProxyMiddleware({
    target: 'http://auth-service:5001',
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '/' },
}));

app.use('/api/rides', createProxyMiddleware({
    target: 'http://ride-service:5002',
    changeOrigin: true,
    pathRewrite: { '^/api/rides': '/' },
}));



app.listen(PORT, () => console.log(`API Gateway on port ${PORT}`));
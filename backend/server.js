const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/status', (req, res) => {

    const status = {
        status: 'ok',
        timestamp: new Date().toISOString(),
    };
    res.status(200).json(status);
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = { app, server };
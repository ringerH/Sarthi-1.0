const request = require('supertest');
const { app, server } = require('../server'); // Import the app and server

// Jest hook to close the server after all tests are done
afterAll((done) => {
    server.close(done);
});

describe('GET /api/status', () => {

    // Test Case 1: Ensure the endpoint returns a 200 OK status code.
    it('should return 200 OK', async () => {
        const res = await request(app).get('/api/status');
        expect(res.statusCode).toEqual(200);
    });

    // Test Case 2: Ensure the response body is a valid JSON object
    // with the correct structure and content.
    it('should return a JSON object with status "ok"', async () => {
        const res = await request(app).get('/api/status');
        
        // Check for the 'Content-Type' header to be 'application/json'
        expect(res.headers['content-type']).toMatch(/json/);
        
        // Check the body's properties
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toBe('ok');
        expect(res.body).toHaveProperty('timestamp');
    });

    // Test Case 3: Ensure the timestamp is a valid ISO 8601 date string.
    it('should have a valid ISO timestamp', async () => {
        const res = await request(app).get('/api/status');
        const timestamp = res.body.timestamp;
        const date = new Date(timestamp);
        
        // Check if the timestamp is a string and if it converts to a valid date
        expect(typeof timestamp).toBe('string');
        expect(date.toISOString()).toBe(timestamp);
    });
});

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin); 

router.post('/verify', authController.verifyToken);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
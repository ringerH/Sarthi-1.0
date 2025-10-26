const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Create a new ride
router.post('/', rideController.createRide);

// Get all rides (with optional filters)
router.get('/', rideController.getRides);

// Get specific ride by ID
router.get('/:id', rideController.getRideById);

// Update a ride
router.put('/:id', rideController.updateRide);

// Delete a ride
router.delete('/:id', rideController.deleteRide);

// Join a ride
router.post('/:id/join', rideController.joinRide);

// Leave a ride
router.post('/:id/leave', rideController.leaveRide);

module.exports = router;
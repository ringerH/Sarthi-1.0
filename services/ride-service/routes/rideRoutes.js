const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', rideController.createRide);

router.get('/', rideController.getRides);

router.get('/:id', rideController.getRideById);

router.put('/:id', rideController.updateRide);

router.delete('/:id', rideController.deleteRide);

router.post('/:id/join', rideController.joinRide);

router.post('/:id/leave', rideController.leaveRide);

module.exports = router;
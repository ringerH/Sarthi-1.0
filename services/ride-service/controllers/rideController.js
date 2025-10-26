const Ride = require('../models/rideModel');

// Create a new ride
exports.createRide = async (req, res) => {
    try {
        const { date, time, destination, departureLocation, availableSeats, costPerPerson, notes } = req.body;
        
        const ride = new Ride({
            createdBy: req.user.id,
            date,
            time,
            destination,
            departureLocation,
            availableSeats,
            totalSeats: availableSeats,
            costPerPerson,
            notes
        });

        await ride.save();
        res.status(201).json({ message: 'Ride created successfully', ride });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all active rides
exports.getRides = async (req, res) => {
    try {
        const { destination, date, status } = req.query;
        
        let filter = {};
        if (destination) filter.destination = new RegExp(destination, 'i');
        if (date) filter.date = { $gte: new Date(date) };
        if (status) filter.status = status;
        else filter.status = 'active'; // Default to active rides

        const rides = await Ride.find(filter)
            .populate('createdBy', 'email')
            .populate('passengers.userId', 'email')
            .sort({ date: 1, time: 1 });

        res.status(200).json({ rides });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get ride by ID
exports.getRideById = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id)
            .populate('createdBy', 'email')
            .populate('passengers.userId', 'email');

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({ ride });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update ride
exports.updateRide = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Only creator can update
        if (ride.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updates = req.body;
        Object.keys(updates).forEach(key => {
            ride[key] = updates[key];
        });

        await ride.save();
        res.status(200).json({ message: 'Ride updated successfully', ride });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete ride
exports.deleteRide = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Only creator can delete
        if (ride.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await ride.deleteOne();
        res.status(200).json({ message: 'Ride deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Join a ride
exports.joinRide = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Check if already joined
        const alreadyJoined = ride.passengers.some(
            p => p.userId.toString() === req.user.id
        );

        if (alreadyJoined) {
            return res.status(400).json({ message: 'Already joined this ride' });
        }

        // Check if ride is full
        if (ride.availableSeats <= 0) {
            return res.status(400).json({ message: 'Ride is full' });
        }

        // Add passenger
        ride.passengers.push({ userId: req.user.id });
        ride.availableSeats -= 1;

        // Update status if full
        if (ride.availableSeats === 0) {
            ride.status = 'full';
        }

        await ride.save();
        res.status(200).json({ message: 'Joined ride successfully', ride });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Leave a ride
exports.leaveRide = async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Check if user is in passengers
        const passengerIndex = ride.passengers.findIndex(
            p => p.userId.toString() === req.user.id
        );

        if (passengerIndex === -1) {
            return res.status(400).json({ message: 'You are not part of this ride' });
        }

        // Remove passenger
        ride.passengers.splice(passengerIndex, 1);
        ride.availableSeats += 1;

        // Update status
        if (ride.status === 'full') {
            ride.status = 'active';
        }

        await ride.save();
        res.status(200).json({ message: 'Left ride successfully', ride });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
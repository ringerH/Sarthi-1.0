const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    departureLocation: {
        type: String,
        required: true,
        trim: true
    },
    availableSeats: {
        type: Number,
        required: true,
        min: 1
    },
    totalSeats: {
        type: Number,
        required: true
    },
    passengers: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['active', 'full', 'completed', 'cancelled'],
        default: 'active'
    },
    costPerPerson: {
        type: Number,
        required: false
    },
    notes: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
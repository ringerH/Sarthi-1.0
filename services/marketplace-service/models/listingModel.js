const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['furniture', 'books', 'electronics', 'utilities', 'clothing', 'sports', 'other']
    },
    condition: {
        type: String,
        required: true,
        enum: ['new', 'like-new', 'good', 'fair', 'poor']
    },
    images: [{
        type: String
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'reserved'],
        default: 'available'
    },
    contactInfo: {
        phone: String,
        room: String,
        hostel: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
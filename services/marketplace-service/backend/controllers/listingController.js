const Listing = require('../models/listingModel');

// Create a new listing
exports.createListing = async (req, res) => {
    try {
        const { title, description, price, category, condition, images, contactInfo } = req.body;
        
        const listing = new Listing({
            title,
            description,
            price,
            category,
            condition,
            images,
            contactInfo,
            createdBy: req.user.id
        });

        await listing.save();
        res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all listings
exports.getListings = async (req, res) => {
    try {
        const { category, status, minPrice, maxPrice, search } = req.query;
        
        let filter = {};
        
        if (category) filter.category = category;
        if (status) filter.status = status;
        else filter.status = 'available'; // Default to available listings
        
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        
        if (search) {
            filter.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ];
        }

        const listings = await Listing.find(filter)
            .populate('createdBy', 'email')
            .sort({ createdAt: -1 });

        res.status(200).json({ listings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get listing by ID
exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate('createdBy', 'email');

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.status(200).json({ listing });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update listing
exports.updateListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Only creator can update
        if (listing.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updates = req.body;
        Object.keys(updates).forEach(key => {
            listing[key] = updates[key];
        });

        await listing.save();
        res.status(200).json({ message: 'Listing updated successfully', listing });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete listing
exports.deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Only creator can delete
        if (listing.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await listing.deleteOne();
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user's own listings
exports.getMyListings = async (req, res) => {
    try {
        const listings = await Listing.find({ createdBy: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({ listings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark listing as sold
exports.markAsSold = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Only creator can mark as sold
        if (listing.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        listing.status = 'sold';
        await listing.save();
        
        res.status(200).json({ message: 'Listing marked as sold', listing });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
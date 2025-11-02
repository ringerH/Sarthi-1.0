const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ALLOWED_DOMAIN = '@iiitg.ac.in';
// Register new user

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body; // This is the ID token from the frontend

        // 6. Verify the token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // 7. --- THIS IS THE CRITICAL VERIFICATION ---
        if (!email || !email.endsWith(ALLOWED_DOMAIN)) {
            return res.status(403).json({
                message: `Login failed. Only ${ALLOWED_DOMAIN} accounts are allowed.`
            });
        }

        // 8. Find or create the user in your database
        let user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist, create them
            // We use a "dummy" password since they won't use it
            user = new User({
                email,
                name,
                // picture, // You can save this too if your model supports it
                password: await bcrypt.hash(Math.random().toString(36), 10), // Create a random password
            });
            await user.save();
        }

        // 9. Generate *your* (Sarthi) JWT token
        const sarthiToken = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful",
            token: sarthiToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({
            message: "Error logging in with Google",
            error: error.message
        });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email and password are required" 
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: "Invalid credentials" 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: "Invalid credentials" 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: "Error logging in",
            error: error.message 
        });
    }
};

// Verify token (for other services to validate)
exports.verifyToken = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ 
                message: "No token provided" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Optionally verify user still exists
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ 
                message: "User not found" 
            });
        }

        res.status(200).json({
            valid: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(401).json({ 
            valid: false,
            message: "Invalid token" 
        });
    }
};

// Get current user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching profile",
            error: error.message 
        });
    }
};
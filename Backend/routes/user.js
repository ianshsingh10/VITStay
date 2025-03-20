import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { jwtSecret } from '../config.js';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Login route
router.post('/login', async (req, res) => {
    try {
        const { regNo, password } = req.body;

        const user = await User.findOne({ regNo });
        if (!user) return res.status(404).send({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, regNo: user.regNo }, jwtSecret, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful', token, username: user.username });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { regNo, password } = req.body;

        const existingUser = await User.findOne({ regNo });
        if (existingUser) return res.status(400).send({ error: 'User already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ regNo, password: hashedPassword });
        await newUser.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Google Login route
// Google Login route
router.post('/google-login', async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: '249046872949-oa2m17cs3986jd6g2j193c5rrofb1bbk.apps.googleusercontent.com'
        });

        const payload = ticket.getPayload();
        const googleId = payload.sub;
        const fullNameAndRegNo = payload.name;
        const email=payload.email;

        // Extracting name and regNo
        const nameMatch = fullNameAndRegNo.match(/^(.*)\s(\w{10})$/);
        
        if (!nameMatch) return res.status(400).json({ message: 'Invalid name format received from Google' });

        const username = nameMatch[1]; // Name part
        const regNo = nameMatch[2];     // Last 10 digits

        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({
                googleId,
                username,
                regNo,
                email,
            });
            await user.save();
        }

        const token = jwt.sign(
            { id: user._id, regNo: user.regNo, username: user.username }, 
            jwtSecret, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Google login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Google login failed' });
    }
});

// Profile route
router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized. No token provided.' });

        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: 'User not found.' });

        res.status(200).json({
            username: user.username,
            regNo: user.regNo,
            email: user.regNo.includes('@') ? user.regNo : 'N/A' 
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user data.' });
    }
});

export default router;

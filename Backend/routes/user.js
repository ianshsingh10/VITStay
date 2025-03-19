import express from 'express';
const router = express.Router();
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';
// import { authMiddleware } from './middleware.js';

// Login route
router.post('/login', async (req, res) => {
    try {
        const { regNo, password } = req.body;

        if (!regNo || !password) {
            return res.status(400).send({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ regNo });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, regNo: user.regNo }, jwtSecret, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful', token, username: user.username });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: 'Error logging in' });
    }
});
export default router;
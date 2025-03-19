import express from 'express';
const router = express.Router();
import { authMiddleware } from './middleware.js';
import Hostel from '../models/hostelmodel.js';

// hostel add
router.post('/add', async (req, res) => {
    try {
        const { name, location, totalRooms, availableRooms, amenities } = req.body;
        
        const newHostel = new Hostel({
            name,
            location,
            totalRooms,
            availableRooms,
            amenities
        });

        await newHostel.save();
        res.status(201).json({ message: 'Hostel added successfully' });
    } catch (error) {
        console.error('Error adding hostel:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/hostel', authMiddleware, async (req, res) => {
    try {
        const hostels = await Hostel.find(); // Fetch hostels from the database
        res.status(200).json({ hostels });
    } catch (error) {
        console.error('Error fetching hostels:', error);
        res.status(500).json({ message: 'Failed to fetch hostels' });
    }
});
export default router;
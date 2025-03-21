import express from 'express';
import Complaint from '../models/complaint.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';

const router = express.Router();

// Route to file a complaint
router.post('/file', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized. No token provided." });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const { complaintType, description, roomNumber } = req.body;

        const newComplaint = new Complaint({
            regNo: decoded.regNo,
            roomNumber,
            complaintType,
            description
        });

        await newComplaint.save();
        res.status(201).json({ message: "Complaint filed successfully!" });
    } catch (error) {
        console.error("Error filing complaint:", error);
        res.status(500).json({ message: "Failed to file complaint." });
    }
});

export default router;

import express from "express";
import Hostel from "../models/hostelmodel.js";

const router = express.Router();

// Create a new hostel
router.post("/add", async (req, res) => {
  try {
    const { name, location, totalCapacity, availableBeds, warden, supervisor, mess, amenities } = req.body;
    
    const newHostel = new Hostel({
      name,
      location,
      totalCapacity,
      availableBeds,
      warden,
      supervisor,
      mess,
      amenities,
    });

    await newHostel.save();
    res.status(201).json({ message: "Hostel added successfully", hostel: newHostel });
  } catch (error) {
    res.status(500).json({ error: "Error adding hostel" });
  }
});

// Get all hostels
router.get("/hostel", async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json({ hostels });
  } catch (error) {
    res.status(500).json({ error: "Error fetching hostels" });
  }
});

export default router;

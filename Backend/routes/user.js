import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { jwtSecret } from "../config.js";
import { OAuth2Client } from "google-auth-library";
import HostelRoom from "../models/hostel.js";
import UserInfo from "../models/userinfo.js";
import Complaint from "../models/complaint.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Login route
router.post("/login", async (req, res) => {
  try {
    const { regNo, password } = req.body;

    const user = await User.findOne({ regNo });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, regNo: user.regNo }, jwtSecret, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .send({ message: "Login successful", token, username: user.username });
  } catch (error) {
    res.status(500).send({ message: "Error logging in" });
  }
});

// Register route
router.post("/register", async (req, res) => {
  try {
    const { regNo, password } = req.body;

    const existingUser = await User.findOne({ regNo });
    if (existingUser)
      return res.status(400).send({ error: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ regNo, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Google Login route
router.post("/google-login", async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience:
        "249046872949-oa2m17cs3986jd6g2j193c5rrofb1bbk.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const fullNameAndRegNo = payload.name;
    const email = payload.email;
    const profilePicture = payload.picture; // Get profile picture URL from Google

    const nameMatch = fullNameAndRegNo.match(/^(.*)\s(\w{10})$/);

    if (!nameMatch)
      return res
        .status(400)
        .json({ message: "Invalid name format received from Google" });

    const username = nameMatch[1];
    const regNo = nameMatch[2];

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        googleId,
        username,
        regNo,
        email,
        profilePicture, // Save profile picture URL
      });
      await user.save();
    } else {
      user.profilePicture = profilePicture; // Update if user already exists
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, regNo: user.regNo, username: user.username },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Google login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Google login failed" });
  }
});

// Profile route
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({
      username: user.username,
      regNo: user.regNo,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data." });
  }
});

// Route to fetch rooms by hostel name, wing name, and floor

router.post("/book", async (req, res) => {
    const { roomNumber, bedIndex, hostelName } = req.body;
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from headers
  
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });
  
    try {
      // Verify token and extract the user's regNo
      const decoded = jwt.verify(token, jwtSecret);
      const userRegNo = decoded.regNo;
  
      const hostel = await HostelRoom.findOne({
        name: hostelName,
        "wing.floors.rooms.roomNumber": roomNumber
      });
      
  
      if (!hostel) return res.status(404).json({ message: "Room not found." });
  
      let roomFound = false;
      let floorName, wingName; // Store block, wing, and hostel name
  
      hostel.wing.forEach((wing) => {
        wing.floors.forEach((floor) => {
          floor.rooms.forEach((room) => {
            if (room.roomNumber === roomNumber) {
              roomFound = true;
              wingName = wing.wingName;
              floorName= (floor.floorNumber==0)?"Ground":floor.floorNumber; // Storing the hostel name
  
              if (room.beds[bedIndex].regNo) {
                return res
                  .status(400)
                  .json({ message: "The selected bed is already booked." });
              }
  
              room.beds[bedIndex].regNo = userRegNo; // Save the regNo to the selected bed
            }
          });
        });
      });
  
      if (!roomFound) return res.status(404).json({ message: "Room not found." });
  
      await hostel.save();
  
      // Update or Create the UserInfo entry for the user
      const userInfo = await UserInfo.findOneAndUpdate(
        { regNo: userRegNo },
        { 
          $set: { 
            hostel: hostelName,
            floor: floorName,
            wing: wingName,
            roomNumber: roomNumber
          }
        },
        { new: true, upsert: true } // Creates a new entry if it doesn't exist
      );
      
  
      res.json({ message: "Room booked successfully!" });
    } catch (error) {
      console.error("Error booking the bed:", error);
      res.status(500).json({ message: "Error booking the bed." });
    }
  });

  router.get("/hostel-info", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token, jwtSecret);
      const regNo = decoded.regNo;
  
      const user = await User.findOne({ regNo });
      const userInfo = await UserInfo.findOne({ regNo });
  
      if (!user || !userInfo) {
        console.log(`UserInfo not found for regNo: ${regNo}`);
        return res.status(404).json({ message: "UserInfo not found" });
      }
  
      res.status(200).json({
        name: user.username,
        block: userInfo.hostel,
        roomNumber: userInfo.roomNumber,
      });
    } catch (err) {
      console.error("Error fetching user hostel info:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Complaint route
  router.post("/complaint", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token, jwtSecret);
      const regNo = decoded.regNo;
  
      const { name, block, roomNumber, serviceType, description } = req.body;
  
      // Check for missing fields in the request body
      if (!name || !block || !roomNumber || !serviceType || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const complaint = new Complaint({
        regNo,
        name,
        block,
        roomNumber,
        serviceType,
        description,
      });
  
      await complaint.save();
      res.status(201).json({ message: "Complaint submitted successfully!" });
    } catch (err) {
      console.error("Error saving complaint:", err); // Log the full error
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  });

  router.get("/complaints", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token, jwtSecret);
      const regNo = decoded.regNo;
  
      const complaints = await Complaint.find({ regNo }).sort({ createdAt: -1 });
  
      res.status(200).json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ message: "Failed to fetch complaints" });
    }
  });
  
  router.get("/:hostelName", async (req, res) => {
    const { hostelName } = req.params;
    const { floor } = req.query;
  
    try {
      const hostel = await HostelRoom.findOne({ name: hostelName });
  
      if (!hostel) {
        console.log(`Hostel with name "${hostelName}" not found.`);
        return res.status(404).json({ message: "Hostel not found." });
      }
  
      let filteredRooms = [];
  
      hostel.wing.forEach((wing) => {
        wing.floors.forEach((floorObj) => {
          if (floorObj.floorNumber === parseInt(floor)) {
            filteredRooms.push(
              ...floorObj.rooms.map((room) => ({
                roomNumber: room.roomNumber,
                beds: room.beds,
              }))
            );
          }
        });
      });
  
      if (filteredRooms.length === 0) {
        return res
          .status(404)
          .json({ message: "No rooms found for the specified floor." });
      }
  
      res.json({ rooms: filteredRooms });
    } catch (err) {
      console.error("Error fetching rooms:", err);
      res.status(500).send({ message: "Failed to fetch rooms." });
    }
  });
  
export default router;

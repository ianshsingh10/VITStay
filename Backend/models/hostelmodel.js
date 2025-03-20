import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  totalCapacity: { type: Number, required: true }, // Updated field
  availableBeds: { type: Number, required: true }, // Updated field
  warden: { type: String, required: true }, // New field
  supervisor: { type: String, required: true }, // New field
  mess: { type: String, required: true }, // New field
  amenities: { type: [String], default: [] }, // List of amenities
});

const Hostel = mongoose.model("Hostel", hostelSchema);

export default Hostel;

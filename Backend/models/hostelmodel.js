import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  totalRooms: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  amenities: { type: [String], default: [] }
});

const Hostel = mongoose.model('Hostel', hostelSchema);

export default Hostel;

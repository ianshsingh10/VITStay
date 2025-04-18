import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  regNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ['Electrician', 'Plumbing', 'Cleaning', 'Carpentry', 'Other'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;

import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    complaintType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;

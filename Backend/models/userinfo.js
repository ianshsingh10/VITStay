import mongoose from 'mongoose';

const userInfoSchema = new mongoose.Schema({
    regNo: { 
        type: String, 
        required: true, 
        unique: true 
    },
    hostel: { 
        type: String, 
        required: true 
    },
    floor: { 
        type: String, 
        required: true 
    },
    wing: { 
        type: String, 
        required: true 
    },
    roomNumber: { 
        type: String, 
        required: true 
    }
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo;

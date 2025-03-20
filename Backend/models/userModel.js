import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    regNo: { type: String, unique: true },
    password: { type: String },
    googleId: { type: String },
    username: { type: String },
    email: { type: String },
    profilePicture:{ type: String }
});

export default mongoose.model('User', userSchema);

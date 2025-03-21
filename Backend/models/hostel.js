import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bedSchema = new Schema({
    bedNumber: Number,
    regNo: { type: String, default: null }
});

const roomSchema = new Schema({
    roomNumber: String,
    beds: [bedSchema]
});

const floorSchema = new Schema({
    floorNumber: Number,
    rooms: [roomSchema]
});

const wingSchema = new Schema({
    wingName: String,
    bedType: String,
    bedsPerRoom: Number,
    floors: [floorSchema]
});

const hostelRoomSchema = new Schema({
    name: String,
    wing: [wingSchema]
});

const HostelRoom = model('HostelRoom', hostelRoomSchema);

export default HostelRoom;

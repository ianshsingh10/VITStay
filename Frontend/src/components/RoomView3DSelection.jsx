import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RoomView3DSelection = () => {
    const navigate = useNavigate();
    const [selectedHostel, setSelectedHostel] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('');

    const hostels = [
        { id: 'gh1', name: 'Girls Hostel Block 1' },
        { id: 'gh2', name: 'Girls Hostel Block 2' },
        { id: 'bh1', name: 'Boys Hostel Block 1' },
        { id: 'bh2', name: 'Boys Hostel Block 2' },
        { id: 'bh3', name: 'Boys Hostel Block 3' },
    ];

    const roomTypes = [
        { id: '1-bedflat', name: '1 Bed Flat' },
        { id: '2-bedflat', name: '2 Bed Flat' },
        { id: '3-bedflat', name: '3 Bed Flat' },
        { id: '4-bedflat', name: '4 Bed Flat' },
    ];

    const handleView3D = () => {
        if (selectedHostel && selectedRoomType) {
            navigate(`/room-view-3d/${selectedHostel}/${selectedRoomType}`, {
                state: {
                    hostel: selectedHostel,
                    roomType: selectedRoomType
                }
            });
        } else {
            alert('Please select both hostel block and room type');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-[12vh] px-6 md:px-16 pb-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-center mb-8 text-[#2B4B7E]">
                        Select Hostel Block and Room Type
                    </h1>

                    {/* Hostel Selection */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Select Hostel Block</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hostels.map((hostel) => (
                                <motion.button
                                    key={hostel.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-4 rounded-lg border-2 transition-colors ${
                                        selectedHostel === hostel.id
                                            ? 'border-[#2B4B7E] bg-[#2B4B7E] text-white'
                                            : 'border-gray-300 hover:border-[#2B4B7E]'
                                    }`}
                                    onClick={() => setSelectedHostel(hostel.id)}
                                >
                                    {hostel.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Room Type Selection */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Select Room Type</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {roomTypes.map((type) => (
                                <motion.button
                                    key={type.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-4 rounded-lg border-2 transition-colors ${
                                        selectedRoomType === type.id
                                            ? 'border-[#2B4B7E] bg-[#2B4B7E] text-white'
                                            : 'border-gray-300 hover:border-[#2B4B7E]'
                                    }`}
                                    onClick={() => setSelectedRoomType(type.id)}
                                >
                                    {type.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* View 3D Button */}
                    <div className="text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#2B4B7E] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#1a3a6d] transition-colors"
                            onClick={handleView3D}
                        >
                            View 3D Room
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomView3DSelection; 
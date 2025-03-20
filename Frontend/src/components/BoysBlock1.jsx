import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "@fontsource/poppins";

const API_BASE_URL = "http://localhost:5000";

const RoomSelectionPage = () => {
  const { hostelName } = useParams();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/rooms/${hostelName}`);
        const data = await response.json();
        if (response.ok) {
          setRooms(data.rooms);
        } else {
          alert("Failed to fetch rooms.");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [hostelName]);

  const handleRoomSelect = (roomNumber) => {
    setSelectedRoom(roomNumber);
  };

  const handleConfirmSelection = () => {
    if (selectedRoom) {
      alert(`You have successfully selected Room ${selectedRoom}`);
    } else {
      alert("Please select a room before confirming.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">{hostelName} - Room Selection</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {rooms.map((room) => (
          <div
            key={room.roomNumber}
            onClick={() => handleRoomSelect(room.roomNumber)}
            className={`p-4 rounded-xl shadow-md cursor-pointer transition transform hover:scale-105
            ${room.isAvailable ? (selectedRoom === room.roomNumber ? 'bg-green-500 text-white' : 'bg-white text-black') : 'bg-red-400 text-white'}`}
          >
            Room {room.roomNumber}
          </div>
        ))}
      </div>
      <button
        onClick={handleConfirmSelection}
        className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default RoomSelectionPage;

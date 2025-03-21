import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "@fontsource/poppins";

const API_BASE_URL = "http://localhost:5000";

const RoomSelectionPage = () => {
  const { hostelName } = useParams();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBed, setSelectedBed] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${hostelName}?floor=${currentFloor}`);
        const data = await response.json();

        if (response.ok) {
          setRooms(data.rooms);
        } else {
          alert(data.message || "Failed to fetch rooms.");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, [hostelName, currentFloor]);

  const handleRoomSelect = (roomNumber, bedIndex) => {
    setSelectedRoom(roomNumber);
    setSelectedBed(bedIndex);
  };

  const handleConfirmSelection = async () => {
    if (selectedRoom !== null && selectedBed !== null) {
      const token = localStorage.getItem("token"); // Assuming you store your JWT token in localStorage

      if (!token) {
        alert("You need to be logged in to book a bed.");
        navigate("/login"); // Redirect to login if the user is not authenticated
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/users/book`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  // Send the token in the request headers
          },
          body: JSON.stringify({
            roomNumber: selectedRoom,
            bedIndex: selectedBed
          })
        });

        const result = await response.json();

        if (response.ok) {
          alert(`Room ${selectedRoom}, Bed ${selectedBed + 1} successfully booked!`);
          setSelectedRoom(null);
          setSelectedBed(null);
        } else {
          alert(result.message || "Failed to book the bed.");
        }
      } catch (error) {
        console.error("Error booking the bed:", error);
      }
    } else {
      alert("Please select a room and bed before confirming.");
    }
};

  const handleNextFloor = () => {
    if (currentFloor < 6) setCurrentFloor(currentFloor + 1);
  };

  const handlePreviousFloor = () => {
    if (currentFloor > 0) setCurrentFloor(currentFloor - 1);
  };

  return (
    <div className="flex flex-col items-center mt-20 justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 p-10">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 text-white shadow-lg"
      >
        {hostelName} - Room Selection (Floor {currentFloor})
      </motion.h2>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {rooms.map((room) => (
          <motion.div
            key={room.roomNumber}
            whileHover={{ scale: 1.05 }}
            className={`p-5 rounded-2xl shadow-lg cursor-pointer transition 
              ${selectedRoom === room.roomNumber ? "bg-green-400 text-white" : "bg-white bg-opacity-30 text-black backdrop-blur-sm"}`}
          >
            <h3 className="font-bold mb-4 text-xl text-center">Room {room.roomNumber}</h3>
            <div className="grid grid-cols-3 gap-3">
            {room.beds.map((bed, index) => (
  <div
    key={index}
    onClick={() => bed.regNo === null && handleRoomSelect(room.roomNumber, index)} // Only allow selection if bed is not booked
    className={`p-3 rounded-lg cursor-pointer text-center text-sm transition
      ${bed.regNo === null ? "bg-blue-400" : "bg-red-400"} 
      ${selectedRoom === room.roomNumber && selectedBed === index ? "border-4 border-yellow-500" : ""}`}
  >
    {bed.regNo === null ? `Bed ${index + 1}` : `${bed.regNo}`}
  </div>
))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-6 mb-6">
        <button
          onClick={handlePreviousFloor}
          className="bg-blue-500 text-white py-3 px-5 rounded-xl shadow-lg transition hover:bg-blue-600 disabled:bg-gray-400"
          disabled={currentFloor === 0}
        >
          Previous Floor
        </button>
        <button
          onClick={handleNextFloor}
          className="bg-blue-500 text-white py-3 px-5 rounded-xl shadow-lg transition hover:bg-blue-600 disabled:bg-gray-400"
        >
          Next Floor
        </button>
      </div>

      <button
        onClick={handleConfirmSelection}
        className="bg-green-500 text-white py-3 px-6 rounded-xl shadow-lg transition hover:bg-green-600"
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default RoomSelectionPage;

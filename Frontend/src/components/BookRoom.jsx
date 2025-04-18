import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import '@fontsource/poppins';

const API_BASE_URL = "http://localhost:5000";

const RoomSelectionPage = () => {
  const { hostelName } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedBed, setSelectedBed] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(0);
  const [wingDetails, setWingDetails] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${hostelName}?floor=${currentFloor}`);
        const data = await response.json();

        if (response.ok) {
          setRooms(data.rooms);
          setWingDetails(data.wingDetails);
        } else {
          alert(data.message || 'Failed to fetch rooms.');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, [currentFloor, hostelName]);

  const handleRoomSelect = (roomNumber) => {
    setSelectedRoom(roomNumber);
    setSelectedBed(null); // reset bed selection when changing room
  };

  const handleFloorChange = (floor) => {
    setCurrentFloor(floor);
    setSelectedRoom(null); // reset room & bed on floor change
    setSelectedBed(null);
  };

  const handleConfirmSelection = async () => {
    if (selectedRoom !== null && selectedBed !== null) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to book a bed.");
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/book`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            roomNumber: selectedRoom,
            bedIndex: selectedBed,
            hostelName: hostelName // ✅ Send selected hostelName to backend
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

  return (
    <div className="flex min-h-screen font-[Poppins]">
      <div className="w-1/4 bg-gray-800 text-white p-6 space-y-4 overflow-y-auto pt-[15vh]">
        <div className="flex justify-between mb-4 overflow-x-auto scrollbar-hide">
          {[...Array(7)].map((_, floor) => (
            <button
              key={floor}
              onClick={() => handleFloorChange(floor)}
              className={`py-2 px-4 mx-1 rounded-xl transition ${currentFloor === floor ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Floor {floor === 0 ? "Ground" : floor}
            </button>
          ))}
        </div>
        {wingDetails && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">Wing: {wingDetails.wingName}</h2>
            <p>Bed Type: {wingDetails.bedType}</p>
            <p>Beds Per Room: {wingDetails.bedsPerRoom}</p>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4">Rooms</h2>
        <div className="overflow-y-auto max-h-[63vh]">
          {rooms.map((room) => (
            <button
              key={room.roomNumber}
              onClick={() => handleRoomSelect(room.roomNumber)}
              className={`w-full py-2 px-4 rounded-xl transition mb-2 ${selectedRoom === room.roomNumber ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Room {room.roomNumber}
            </button>
          ))}
        </div>
      </div>

      <div className="w-3/4 p-6 bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center fixed right-0 top-0 bottom-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 w-full max-w-3xl text-center"
        >
          {selectedRoom && (
            <div className="mt-8 p-6 bg-white rounded-xl">
              <h3 className="text-xl font-bold">Room {selectedRoom} - Beds</h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {rooms.find(room => room.roomNumber === selectedRoom)?.beds.map((bed, index) => (
                  <div
                    key={index}
                    onClick={() => bed.regNo === null && setSelectedBed(index)}
                    className={`p-4 rounded-lg text-center cursor-pointer ${bed.regNo === null ? 'bg-blue-400' : 'bg-red-400'} ${selectedBed === index ? 'border-4 border-yellow-500' : ''}`}
                  >
                    {bed.regNo === null ? `Bed ${index + 1}` : `${bed.regNo}`}
                  </div>
                ))}
              </div>
              <button
                onClick={handleConfirmSelection}
                className="bg-green-500 text-white py-3 px-6 rounded-xl shadow-lg mt-4 transition hover:bg-green-600"
              >
                Confirm Selection
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RoomSelectionPage;

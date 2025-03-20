import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins"; // Import Poppins font

const API_BASE_URL = "http://localhost:5000";

const HostelSelectionPage = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      const token = localStorage.getItem("token"); // Retrieve JWT token
      if (!token) {
        alert("Unauthorized! Please log in first.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/hostels/hostel`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hostels.");
        }

        const data = await response.json();
        setHostels(data.hostels);
      } catch (error) {
        console.error("Error fetching hostels:", error);
        alert("An error occurred while fetching hostels.");
      }
    };

    fetchHostels();
  }, [navigate]);

  const handleHostelClick = (hostelName) => {
    setSelectedHostel((prevSelected) =>
      prevSelected === hostelName ? null : hostelName
    );
  };

  const handleSelection = () => {
    if (selectedHostel) {
      alert(`You selected hostel: ${selectedHostel}`);
    } else {
      alert("Please select a hostel.");
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: "url('/images/hostel-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md"></div>

      <h2 className="relative text-3xl font-bold text-center text-white mb-8 drop-shadow-lg z-10">
        Select Your Hostel
      </h2>

      {/* Hostel Grid */}
      <div className="relative grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
        {hostels.length === 0 ? (
          <p className="text-center text-white col-span-2 md:col-span-3">
            Loading hostels...
          </p>
        ) : (
          hostels.map((hostel) => (
            <div
              key={hostel._id}
              className={`flex flex-col justify-between p-6 border rounded-xl cursor-pointer transition-all duration-300 aspect-square shadow-lg backdrop-blur-md bg-white/30 hover:bg-white/50 hover:scale-105 hover:shadow-xl ${
                selectedHostel === hostel.name
                  ? "border-4 border-blue-500 bg-blue-600 text-white shadow-md scale-105"
                  : "text-white"
              }`}
              onClick={() => handleHostelClick(hostel.name)}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <h3 className="text-lg font-semibold">{hostel.name}</h3>
              <p className="text-sm">{hostel.description}</p>
              <p className="text-xs">
                <strong>Available Rooms:</strong> {hostel.availableRooms}
              </p>
            </div>
          ))
        )}
      </div>

      <button
        className="relative mt-8 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg hover:scale-105 z-10"
        onClick={handleSelection}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default HostelSelectionPage;

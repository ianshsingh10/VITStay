import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "@fontsource/poppins"; // Import Poppins font

const API_BASE_URL = "http://localhost:5000";

const HostelSelectionPage = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      const token = localStorage.getItem("token");
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

  const handleSelection = () => {
    if (selectedHostel) {
      alert(`You selected hostel: ${selectedHostel}`);
    } else {
      alert("Please select a hostel.");
    }
  };

  const openModal = (hostel) => {
    setModalContent(hostel);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalContent(null), 300);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen bg-cover bg-center p-6 overflow-hidden"
      style={{
        backgroundImage: "url('/images/hostel-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Page Title */}
      <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-md">
        Select Your Hostel
      </h2>

      {/* Hostel Cards Grid */}
      <AnimatePresence>
        {!modalOpen && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {hostels.length === 0 ? (
              <p className="text-lg font-semibold text-center text-white col-span-2 md:col-span-3">
                Loading hostels...
              </p>
            ) : (
              hostels.map((hostel) => (
                <motion.div
                  key={hostel._id}
                  layout
                  className={`flex flex-col justify-between p-6 border border-gray-300 rounded-xl cursor-pointer transition duration-300 aspect-square shadow-md ${
                    selectedHostel === hostel.name
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedHostel(hostel.name)}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <h3 className="text-xl font-bold">{hostel.name}</h3>
                  <p className="text-md font-semibold">
                    Available Beds: {hostel.availableBeds}
                  </p>
                  <p className="text-sm">{hostel.description}</p>
                  <button
                    className="mt-2 px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(hostel);
                    }}
                  >
                    Info
                  </button>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Selection Button */}
      {!modalOpen && (
        <motion.button
          className="mt-8 bg-blue-700 text-white text-lg py-3 px-8 rounded-xl hover:bg-blue-800 transition shadow-lg"
          onClick={handleSelection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Confirm Selection
        </motion.button>
      )}

      {/* Modal Popup */}
      <AnimatePresence>
        {modalOpen && modalContent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg text-black relative border border-gray-300"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              {/* Hostel Name */}
              <h3 className="text-3xl font-extrabold">{modalContent.name}</h3>

              {/* Location */}
              <p className="mt-2 text-lg">
                <strong>Location:</strong> {modalContent.location}
              </p>

              {/* Warden & Supervisor */}
              <p className="mt-2 text-lg">
                <strong>Warden:</strong> {modalContent.warden}
              </p>
              <p className="mt-2 text-lg">
                <strong>Supervisor:</strong> {modalContent.supervisor}
              </p>

              {/* Mess Type */}
              <p className="mt-2 text-lg">
                <strong>Mess:</strong> {modalContent.mess}
              </p>

              {/* Capacity & Available Beds */}
              <p className="mt-2 text-lg">
                <strong>Total Capacity:</strong> {modalContent.totalCapacity}
              </p>
              <p className="mt-2 text-lg">
                <strong>Available Beds:</strong> {modalContent.availableBeds}
              </p>

              {/* Amenities */}
              <div className="mt-4">
                <strong className="block text-lg">Amenities:</strong>
                <ul className="list-disc list-inside text-md">
                  {modalContent.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>

              {/* Close Button */}
              <button
                className="mt-4 px-5 py-2 text-lg font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={closeModal}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HostelSelectionPage;

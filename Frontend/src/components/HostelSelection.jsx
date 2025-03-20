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
      <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">
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
              <p className="text-center text-white col-span-2 md:col-span-3">
                Loading hostels...
              </p>
            ) : (
              hostels.map((hostel) => (
                <motion.div
                  key={hostel._id}
                  className={`flex flex-col justify-between p-6 border rounded-xl cursor-pointer transition duration-300 aspect-square shadow-lg backdrop-blur-lg bg-white/30 hover:bg-white/40 ${
                    selectedHostel === hostel.name
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedHostel(hostel.name)}
                >
                  <h3 className="text-lg font-semibold">{hostel.name}</h3>
                  <p className="text-sm font-semibold">
                    Available Rooms: {hostel.availableRooms}
                  </p>
                  <p className="text-xs">{hostel.description}</p>
                  <button
                    className="mt-2 px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
          className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-md"
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
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white/20 p-6 rounded-xl shadow-lg backdrop-blur-xl w-[90%] max-w-lg text-white relative border border-white/40"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <h3 className="text-2xl font-bold">{modalContent.name}</h3>
              <p className="mt-2 text-sm font-semibold">
                Available Rooms: {modalContent.availableRooms}
              </p>
              <p className="mt-2">{modalContent.description}</p>
              <p className="mt-2">
                <strong>Facilities:</strong> {modalContent.facilities}
              </p>
              <p className="mt-2">
                <strong>Price per Semester:</strong> ₹{modalContent.price}
              </p>
              <p className="mt-2">
                <strong>Location:</strong> {modalContent.location}
              </p>
              <button
                className="mt-4 px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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

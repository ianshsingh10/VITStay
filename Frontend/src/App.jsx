import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Login from "./components/LoginPage";
import Profile from "./components/ProfilePage";
import HostelSelectionPage from "./components/HostelSelection";
import RoomSelectionPage from "./components/BookRoom";
import ComplaintForm from "./components/ComplaintForm";
import HostelFeeStructure from "./components/HostelFeeStructure";
import Instructions from "./components/Instructions";
import WardenDetails from "./components/WardenDetails";
import RoomView3D from "./components/RoomView3D";
import RoomView3DSelection from "./components/RoomView3DSelection";
import RoomPage from "./components/RoomPage";
import RoomViewPage from "./components/RoomViewPage";
import Chatbot from "./components/Chatbot";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const user = JSON.parse(atob(token.split(".")[1]));
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar
          isLoggedIn={isLoggedIn}
          username={username}
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          handleLogout={handleLogout}
        />
        <div className="pt-[12vh]"> {/* Added padding to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
              }
            />
            <Route
              path="/profile"
              element={<Profile handleLogout={handleLogout} />}
            />
            <Route path="/hostels" element={<HostelSelectionPage />} />
            <Route
              path="/select-room/:hostelName"
              element={<RoomSelectionPage />}
            />
            <Route
              path="/select-room/:hostelName"
              element={<RoomSelectionPage />}
            />
            {/* New Route for Complaint Page */}
            <Route path="/hostel-fee" element={<HostelFeeStructure />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/warden-details" element={<WardenDetails />} />
            <Route path="/room-view-3d-selection" element={<RoomView3DSelection />} />
            <Route path="/room-view-3d" element={<RoomView3D />} />
            <Route path="/room-view" element={<RoomPage />} />
            <Route path="/room-view/:bedtype" element={<RoomViewPage />} />
          </Routes>
        </div>
        <Chatbot />
      </div>
     </Router> 
    
  );
}

export default App;

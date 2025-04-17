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
import RoomView3DSelection from "./components/RoomView3DSelection";
import RoomViewPage from "./components/RoomViewPage";

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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={ <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} /> } />
            <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
            <Route path="/hostels" element={<HostelSelectionPage />} />
            <Route path="/complaint" element={<ComplaintForm />} />
            <Route path="/select-room/:hostelName" element={<RoomSelectionPage />} />
            <Route path="/hostel-fee" element={<HostelFeeStructure />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/warden-details" element={<WardenDetails />} />
            <Route path="/room-view-3d-selection" element={<RoomView3DSelection />} />
            <Route path="/room-view-3d/:hostel/:bedtype" element={<RoomViewPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

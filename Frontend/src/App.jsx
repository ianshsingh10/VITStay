import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/LoginPage';
import Profile from './components/ProfilePage';
import HostelSelectionPage from './components/HostelSelection';
import RoomSelectionPage from './components/BookRoom';
import ComplaintPage from './components/complaint'; // Importing the Complaint Page

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const user = JSON.parse(atob(token.split('.')[1]));
            setUsername(user.username);
        }
    }, []);
  
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <Navbar 
                isLoggedIn={isLoggedIn} 
                username={username} 
                setIsLoggedIn={setIsLoggedIn} 
                setUsername={setUsername} 
                handleLogout={handleLogout} 
            />
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                <Route path="/profile" element={<Profile handleLogout={handleLogout}/>} />
                <Route path="/hostels" element={<HostelSelectionPage/>} />
                <Route path="/select-room/:hostelName" element={<RoomSelectionPage />} />
                <Route path="/complaint" element={<ComplaintPage />} /> {/* New Route for Complaint Page */}
            </Routes>
        </Router>
    );
}

export default App;

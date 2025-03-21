import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/LoginPage';
import Profile from './components/ProfilePage';
import HostelSelectionPage from './components/HostelSelection';
import RoomSelectionPage from './components/BoysBlock1';
import HostelFeeStructure from './components/HostelFeeStructure';

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
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar 
                    isLoggedIn={isLoggedIn} 
                    setIsLoggedIn={setIsLoggedIn}
                    username={username}
                    setUsername={setUsername}
                    handleLogout={handleLogout}
                />
                <div className="flex-1 mt-[10vh]"> {/* Added margin-top to account for fixed navbar */}
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route 
                            path="/login" 
                            element={
                                <Login 
                                    setIsLoggedIn={setIsLoggedIn} 
                                    setUsername={setUsername} 
                                />
                            } 
                        />
                        <Route 
                            path="/profile" 
                            element={
                                <Profile 
                                    handleLogout={handleLogout}
                                    username={username}
                                />
                            } 
                        />
                        <Route path="/hostels" element={<HostelSelectionPage />} />
                        <Route path="/select-room/:hostelName" element={<RoomSelectionPage />} />
                        <Route path="/hostel-fee" element={<HostelFeeStructure />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
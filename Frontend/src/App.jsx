import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/LoginPage';
import Profile from './components/ProfilePage';
import HostelSelectionPage from './components/HostelSelection';

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
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} username={username} />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                    <Route path="/profile" element={<Profile handleLogout={handleLogout}/>} />
                    <Route path="/hostels" element={<HostelSelectionPage/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

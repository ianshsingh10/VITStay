import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn, setUsername, username, handleLogout }) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');
      
        if (token && savedUsername) {
            setIsLoggedIn(true);
            setUsername(savedUsername);
        }
    }, [setIsLoggedIn, setUsername]);
      
    return (
        <nav className="fixed top-[2vmin] w-full z-50 shadow-md">
            <div className="h-[8vh] bg-[#2B4B7E] flex items-center justify-between px-6 md:px-16">
                {/* Left Section - Logo */}
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="VIT Logo" className="w-12 h-12" />
                    <Link to="/">
                        <div className="w-[15vmin] p-[1vmin] text-lg text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
                            VIT BHOPAL
                        </div>
                    </Link>
                </div>

                {/* Center Section - Navigation Links */}
                <div className="hidden md:flex gap-6 text-[1.5vmin] text-bold text-white">
                    <NavLink to="/instructions" className={({ isActive }) => isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"}>
                        INSTRUCTIONS
                    </NavLink>
                    <NavLink to="/hostel-fee" className={({ isActive }) => isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"}>
                        FEE STRUCTURE
                    </NavLink>
                    <NavLink to="/affidavits" className={({ isActive }) => isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"}>
                        AFFIDAVITS
                    </NavLink>
                    <NavLink to="/warden-details" className={({ isActive }) => isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"}>
                        WARDEN DETAILS
                    </NavLink>
                    <NavLink to="/hostels" className={({ isActive }) => isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"}>
                        HOSTEL PREFERENCES
                    </NavLink>
                    <NavLink to="/room-view-3d" className={({ isActive }) => isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"}>
                        ROOM VIEW 3D
                    </NavLink>
                    <NavLink to="/final-allotment" className={({ isActive }) => isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"}>
                        FINAL ROOM ALLOTMENT
                    </NavLink>
                </div>

                {/* Right Section - Profile/Logout */}
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <Link to="/profile">
                            <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE] hover:from-[#97D2FF] hover:to-[#0085CE]">
                                {username.toUpperCase()}
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE] hover:from-[#97D2FF] hover:to-[#0085CE]">
                                LOGIN
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger and close icons (can replace with other icons too)

function Navbar({ isLoggedIn, setIsLoggedIn, setUsername, username }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUsername = localStorage.getItem("username");

        if (token && savedUsername) {
            setIsLoggedIn(true);
            setUsername(savedUsername);
        }
    }, [setIsLoggedIn, setUsername]);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="fixed top-[2vmin] w-full z-50 shadow-md">
            <div className="h-[8vh] bg-[#2B4B7E] flex items-center justify-between px-6 md:px-16">
                {/* Left - Logo */}
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="VIT Logo" className="w-12 h-12" />
                    <Link to="/">
                        <div className="w-[15vmin] p-[1vmin] text-lg text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
                            VIT BHOPAL
                        </div>
                    </Link>
                </div>

                {/* Center - Desktop Nav */}
                <div className="hidden md:flex gap-6 text-[1.5vmin] font-bold text-white">
                    {[
                        { to: "/instructions", label: "INSTRUCTIONS" },
                        { to: "/hostel-fee", label: "FEE STRUCTURE" },
                        { to: "/affidavits", label: "AFFIDAVITS" },
                        { to: "/warden-details", label: "WARDEN DETAILS" },
                        { to: "/hostels", label: "HOSTEL PREFERENCES" },
                        { to: "/room-view", label: "ROOM VIEW 3D" },
                        { to: "/complaint", label: "COMPLAINT" },
                    ].map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Right - Profile/Login & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
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

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-white" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#2B4B7E] text-white text-sm px-6 py-4 space-y-3">
                    {[
                        { to: "/instructions", label: "INSTRUCTIONS" },
                        { to: "/hostel-fee", label: "FEE STRUCTURE" },
                        { to: "/affidavits", label: "AFFIDAVITS" },
                        { to: "/warden-details", label: "WARDEN DETAILS" },
                        { to: "/hostels", label: "HOSTEL PREFERENCES" },
                        { to: "/room-view", label: "ROOM VIEW 3D" },
                        { to: "/complaint", label: "COMPLAINT" },
                    ].map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `block ${isActive ? "text-[#A7E2FF]" : "hover:text-[#A7E2FF]"}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {/* Login/Profile for Mobile */}
                    {isLoggedIn ? (
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                            <div className="w-full py-2 text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE] hover:from-[#97D2FF] hover:to-[#0085CE]">
                                {username.toUpperCase()}
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                            <div className="w-full py-2 text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE] hover:from-[#97D2FF] hover:to-[#0085CE]">
                                LOGIN
                            </div>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;

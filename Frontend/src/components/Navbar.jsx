import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn, setUsername, username }) {

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
      <div className="h-[8vh] bg-[#F3F3F3] flex items-center justify-between px-6 md:px-16">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          <Link to="/">
            <div className="w-[15vmin] p-[1vmin] text-[2.5vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
              VIT Stay
            </div>
          </Link>
        </div>

        <div className="hidden md:flex gap-6 text-[2vmin]">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-500"}>HOME</NavLink>
          <NavLink to="/instructions" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-500"}>INSTRUCTIONS</NavLink>
          <NavLink to="/fee-structure" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-500"}>FEE STRUCTURE</NavLink>
          <NavLink to="/affidavits" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-500"}>AFFIDAVITS</NavLink>
          <NavLink to="/hostels" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-500"}>HOSTELS</NavLink>
          <NavLink to="/complaint" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-500"}>COMPLAINT</NavLink>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link to={`/profile`} className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
                {username}
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
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

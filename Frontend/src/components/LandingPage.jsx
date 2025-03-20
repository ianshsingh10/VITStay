import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="flex-grow flex items-center justify-center">
        <header className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to VITStay</h1>
          <p className="text-lg">Your One Stop Hostel Companion</p>
        </header>
      </div>
      
      <footer className="text-sm text-white/80 mb-4 text-center">
        © 2025 Hostel Allotment System. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

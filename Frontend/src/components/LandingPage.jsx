import React from 'react';

const LandingPage = () => {
  return (
    <div 
      className="min-h-screen flex flex-col justify-between bg-cover bg-center text-white"
      style={{ backgroundImage: `url('./src/images/landing_bg.jpg')` }}
    >
      <div className="flex-grow flex items-center justify-center"> 
        <header className="text-center p-4 rounded-lg space-y-4">
          <h1 className="text-7xl font-bold mb-4 text-white"
              style={{ textShadow: '0 0 10px #0095DE, 0 0 20px #0095DE' }}>
            Welcome to VITStay
          </h1>
          <p className="text-2xl font-bold text-white"
             style={{ textShadow: '0 0 5px #0095DE, 0 0 10px #0095DE' }}>
            Your One Stop Hostel Companion
          </p>
        </header>
      </div>
      
      <footer className="text-sm text-white/80 mb-4 text-center">
        © 2025 Hostel Allotment System. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

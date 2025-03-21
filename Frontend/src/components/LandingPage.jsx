import React from 'react';
import { motion } from 'framer-motion';
import '@fontsource/poppins';

const LandingPage = () => {
  return (
    <div 
      className="min-h-screen flex flex-col justify-between bg-cover bg-center text-white font-[Poppins]"
      style={{ backgroundImage: `url('./src/images/landing_bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <motion.div 
        className="flex-grow flex items-center justify-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <header className="text-center p-4 rounded-lg space-y-6">
          <motion.h1 
            className="text-7xl font-extrabold mb-4 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient"
            style={{ letterSpacing: '0.1em' }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome to VITStay
          </motion.h1>
          <motion.p 
            className="text-2xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{ letterSpacing: '0.05em' }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Your One Stop Hostel Companion
          </motion.p>
        </header>
      </motion.div>

      <motion.footer 
        className="text-sm text-white/80 mb-4 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        © 2025 Hostel Allotment System. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default LandingPage;

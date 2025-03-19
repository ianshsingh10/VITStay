import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Hostel Allotment System</h1>
        <p className="text-lg">Easily find and apply for hostel rooms with our hassle-free platform.</p>
      </header>

      <div className="flex space-x-4">
        <a
          href="/login"
          className="bg-white text-blue-600 py-2 px-6 rounded-xl text-lg hover:bg-gray-200 transition"
        >
          Login
        </a>
      </div>

      <footer className="mt-12 text-sm text-white/80">
        © 2025 Hostel Allotment System. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BedDouble, BedSingle, Bed } from 'lucide-react'; // Optional: Icons from lucide-react

export default function RoomSelectionPage() {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate(`/room-view/${type}`);
  };

  const options = [
    { type: '2-bedflat', label: '2 Bed Flat', icon: <BedSingle className="h-8 w-8 text-indigo-600" /> },
    { type: '3-bedflat', label: '3 Bed Flat', icon: <BedDouble className="h-8 w-8 text-indigo-600" /> },
    { type: '4-bedflat', label: '4 Bed Flat', icon: <Bed className="h-8 w-8 text-indigo-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Select a Room Type</h1>
        <div className="grid grid-cols-1 gap-4">
          {options.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl hover:bg-indigo-50 transition duration-200"
            >
              {icon}
              <span className="text-lg font-medium text-gray-700">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HostelSelectionPage = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchHostels = async () => {
      const token = localStorage.getItem('token'); // Retrieve JWT token
      if (!token) {
        alert('Unauthorized! Please log in first.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/hostels/hostel`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass the token in the headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hostels.');
        }

        const data = await response.json();
        setHostels(data.hostels);
      } catch (error) {
        console.error('Error fetching hostels:', error);
        alert('An error occurred while fetching hostels.');
      }
    };

    fetchHostels();
  }, [navigate]);

  const handleSelection = () => {
    if (selectedHostel) {
      alert(`You selected hostel: ${selectedHostel}`);
    } else {
      alert('Please select a hostel.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 rounded-2xl shadow-xl bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Select Your Hostel</h2>
        
        <div className="space-y-4">
          {hostels.length === 0 ? (
            <p className="text-center">Loading hostels...</p>
          ) : (
            hostels.map((hostel) => (
              <div
                key={hostel._id}
                className={`p-4 border rounded-xl cursor-pointer ${
                  selectedHostel === hostel.name ? 'bg-blue-100 border-blue-500' : ''
                }`}
                onClick={() => setSelectedHostel(hostel.name)}
              >
                <h3 className="text-lg font-bold">{hostel.name}</h3>
                <p>{hostel.description}</p>
                <p><strong>Available Rooms:</strong> {hostel.availableRooms}</p>
              </div>
            ))
          )}
        </div>

        <button
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
          onClick={handleSelection}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default HostelSelectionPage;

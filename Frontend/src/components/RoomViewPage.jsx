import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomScene from '../components/RoomScene';
import RoomView3D from "../components/RoomView3D";

export default function RoomViewPage() {
  const { bedtype, hostel } = useParams();

  // Define GH hostels
  const girlsHostels = ['gh1', 'gh2'];
  const navigate = useNavigate();

  return (
    <>
    <button
          className="absolute z-50 top-[12vmin] left-4 z-10 bg-white text-blue-600 font-medium px-4 py-2 rounded shadow hover:bg-blue-100"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <div className="w-full h-screen">
      {girlsHostels.includes(hostel.toLowerCase()) ? (
        <RoomView3D bedType={bedtype} hostel={hostel} />
      ) : (
        <RoomScene bedType={bedtype} hostel={hostel} />
      )}
    </div>
    </>
    
  );
}

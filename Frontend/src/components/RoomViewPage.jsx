import React from 'react';
import { useParams } from 'react-router-dom';
import RoomScene from '../components/RoomScene';

export default function RoomViewPage() {
  const { bedtype } = useParams();

  return (
    <div className="relative w-full h-screen ">
      <RoomScene bedType={bedtype} />
    </div>
  );
}

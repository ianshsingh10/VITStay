import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

function RoomModel({ bedType }) {
  const modelMap = {
    '2-bedflat': '/assets/2bedflat.glb',
    '3-bedflat': '/assets/3bedflat.glb',
    '4-bedflat': '/assets/3bedflat.glb',
  };

  const modelPath = modelMap[bedType] || modelMap['3-bed'];
  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} scale={1} />;
}

export default function RoomScene({ bedType }) {
  
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Back Button */}
      <button
        className="absolute top-[12vmin] left-4 z-10 bg-white text-blue-600 font-medium px-4 py-2 rounded shadow hover:bg-blue-100"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* 3D Scene */}
      <Canvas shadows style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0} />
          <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
          <PerspectiveCamera makeDefault position={[5, 5, 10]} fov={50} />
          <OrbitControls />
          <Environment preset="apartment" />
          <RoomModel bedType={bedType} />
        </Suspense>
      </Canvas>
    </div>
  );
}

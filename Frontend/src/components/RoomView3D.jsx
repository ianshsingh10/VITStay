import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Environment, Cylinder, Plane } from '@react-three/drei';

const Room = () => {
  // Calculate positions for wardrobes and study tables
  const wardrobePositions = [
    { z: -9, x: 4 },    // First wardrobe
    { z: -1, x: 4 },    // Second wardrobe
    { z: 7, x: 4 }      // Third wardrobe
  ];

  const studyTablePositions = [
    { z: -5, x: 4 },    // First study table (between first and second wardrobe)
    { z: 3, x: 4 },     // Second study table (between second and third wardrobe)
    { z: 11, x: 4 }     // Third study table (after third wardrobe)
  ];

  return (
    <>
      {/* Room walls */}
      <Box args={[12, 9, 24]} position={[0, 4.5, 0]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} side={2} />
      </Box>

      {/* Floor with beige side tiles */}
      <Plane args={[12, 24]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F5F5DC" /> {/* Beige color */}
      </Plane>
      {/* Center light brown tile pattern */}
      <Plane args={[3, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#DEB887" /> {/* Light brown color */}
      </Plane>

      {/* Left Side (Beds) */}
      {/* Beds with storage base */}
      {[-8, 0, 8].map((zPosition) => (
        <group key={`bed-${zPosition}`}>
          {/* Bed Base with Storage */}
          <Box args={[2.5, 0.6, 6]} position={[-4, 0.3, zPosition]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Storage Front Panel */}
          <Box args={[2.5, 0.4, 0.05]} position={[-4, 0.2, zPosition + 2.975]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          <Box args={[2.5, 0.4, 0.05]} position={[-4, 0.2, zPosition - 2.975]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Bed Frame Side Rails */}
          <Box args={[0.1, 0.3, 6]} position={[-2.8, 0.45, zPosition]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          <Box args={[0.1, 0.3, 6]} position={[-5.2, 0.45, zPosition]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Headboard */}
          <Box args={[2.5, 1.2, 0.1]} position={[-4, 0.9, zPosition - 3]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Mattress */}
          <Box args={[2.3, 0.2, 5.8]} position={[-4, 0.7, zPosition]}>
            <meshStandardMaterial color="#87CEEB" />
          </Box>
          {/* Mattress Pattern (to represent the Winnie the Pooh design) */}
          <Box args={[2.2, 0.01, 5.7]} position={[-4, 0.81, zPosition]}>
            <meshStandardMaterial color="#4FA4DE" />
          </Box>
        </group>
      ))}

      {/* Right Side - Wardrobes and Study Areas */}
      {/* Long Mirror facing beds */}
      <Box args={[2, 7, 0.1]} position={[0, 3.5, -12]}>
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Mirror Frame */}
      <Box args={[2.2, 7.2, 0.15]} position={[0, 3.5, -12.05]}>
        <meshStandardMaterial color="#8b4513" />
      </Box>

      {wardrobePositions.map((pos, index) => (
        <group key={`wardrobe-${index}`}>
          {/* Wardrobe */}
          <Box args={[2.5, 8, 3]} position={[pos.x, 4, pos.z]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          {/* Door Line */}
          <Box args={[0.05, 7.8, 0.05]} position={[pos.x, 4, pos.z]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Door Handles */}
          <Box args={[0.1, 0.3, 0.1]} position={[5.2, 4, pos.z - 0.6]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
          <Box args={[0.1, 0.3, 0.1]} position={[5.2, 4, pos.z + 0.6]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
          {/* Lock */}
          <Box args={[0.15, 0.15, 0.15]} position={[5.2, 4.5, pos.z]}>
            <meshStandardMaterial color="#000000" />
          </Box>
        </group>
      ))}

      {/* Windows and Curtains */}
      {/* Window Frame */}
      <Box args={[0.3, 5, 3]} position={[5.85, 4.5, -8]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box args={[0.3, 5, 3]} position={[5.85, 4.5, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box args={[0.3, 5, 3]} position={[5.85, 4.5, 8]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Window Glass */}
      <Box args={[0.1, 4.8, 2.8]} position={[5.85, 4.5, -8]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </Box>
      <Box args={[0.1, 4.8, 2.8]} position={[5.85, 4.5, 0]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </Box>
      <Box args={[0.1, 4.8, 2.8]} position={[5.85, 4.5, 8]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </Box>

      {/* Curtain Rods */}
      <Cylinder args={[0.05, 0.05, 4, 8]} rotation={[0, 0, Math.PI/2]} position={[5.75, 7, -8]}>
        <meshStandardMaterial color="#8b4513" />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 4, 8]} rotation={[0, 0, Math.PI/2]} position={[5.75, 7, 0]}>
        <meshStandardMaterial color="#8b4513" />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 4, 8]} rotation={[0, 0, Math.PI/2]} position={[5.75, 7, 8]}>
        <meshStandardMaterial color="#8b4513" />
      </Cylinder>

      {/* Curtains */}
      {/* Left Side Curtains */}
      <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, -9]}>
        <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
      </Box>
      <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, -7]}>
        <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
      </Box>
      {/* Middle Window Curtains */}
      <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, -1]}>
        <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
      </Box>
      <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, 1]}>
        <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
      </Box>
      {/* Right Window Curtains */}
      <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, 7]}>
        <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
      </Box>
      <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, 9]}>
        <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
      </Box>

      {/* Study Areas */}
      {studyTablePositions.map((pos, index) => (
        <group key={`study-${index}`}>
          {/* Dark Brown Backboard */}
          <Box args={[0.1, 4, 2.8]} position={[2.7, 3, pos.z]}>
            <meshStandardMaterial color="#3a2a1a" />
          </Box>
          {/* Study Desk */}
          <Box args={[2.5, 0.05, 2.8]} position={[2.7, 2.3, pos.z]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          {/* Upper Storage */}
          <Box args={[1.5, 0.05, 2.8]} position={[2.7, 3.5, pos.z]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          <Box args={[1.5, 0.05, 2.8]} position={[2.7, 4.5, pos.z]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          {/* Storage Walls */}
          <Box args={[1.5, 1, 0.05]} position={[2.7, 4, pos.z - 1.4]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          <Box args={[1.5, 1, 0.05]} position={[2.7, 4, pos.z + 1.4]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>

          {/* Chair */}
          <Box args={[0.1, 1.2, 0.8]} position={[1.8, 1.6, pos.z]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.8, 0.1, 0.8]} position={[2.2, 1.1, pos.z]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.7, 0.1, 0.7]} position={[2.2, 1.2, pos.z]}>
            <meshStandardMaterial color="#8b2500" />
          </Box>
          {/* Chair Legs */}
          <Box args={[0.1, 1.1, 0.1]} position={[2.0, 0.55, pos.z - 0.3]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.1, 1.1, 0.1]} position={[2.0, 0.55, pos.z + 0.3]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.1, 1.1, 0.1]} position={[2.4, 0.55, pos.z - 0.3]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.1, 1.1, 0.1]} position={[2.4, 0.55, pos.z + 0.3]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
        </group>
      ))}

      {/* Ceiling Fans */}
      {/* First fan between first and second bed */}
      <Cylinder args={[0.1, 0.1, 0.5, 8]} position={[-4, 8.7, -4]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Cylinder>
      <Box args={[4, 0.1, 0.5]} position={[-4, 8.5, -4]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Box>
      <Box args={[0.5, 0.1, 4]} position={[-4, 8.5, -4]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Box>

      {/* Second fan between second and third bed */}
      <Cylinder args={[0.1, 0.1, 0.5, 8]} position={[-4, 8.7, 4]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Cylinder>
      <Box args={[4, 0.1, 0.5]} position={[-4, 8.5, 4]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Box>
      <Box args={[0.5, 0.1, 4]} position={[-4, 8.5, 4]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Box>

      {/* End Wall Setup */}
      {/* Built-in Shelves */}
      <Box args={[12, 7, 0.3]} position={[0, 3.5, 11.85]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>

      {/* Last Wall Curtain Setup */}
      {/* Curtain Rod */}
      <Cylinder args={[0.05, 0.05, 6, 8]} rotation={[0, Math.PI/2, 0]} position={[0, 7, 11.8]}>
        <meshStandardMaterial color="#8b4513" />
      </Cylinder>

      {/* Curtain Panels */}
      <Box args={[1.5, 5, 0.1]} position={[-2, 4.5, 11.8]}>
        <meshStandardMaterial color="#8B4513" transparent opacity={0.9} />
      </Box>
      <Box args={[1.5, 5, 0.1]} position={[0, 4.5, 11.8]}>
        <meshStandardMaterial color="#8B4513" transparent opacity={0.9} />
      </Box>
      <Box args={[1.5, 5, 0.1]} position={[2, 4.5, 11.8]}>
        <meshStandardMaterial color="#8B4513" transparent opacity={0.9} />
      </Box>
    </>
  );
};

const RoomView3D = () => {
  return (
    <div className="w-full h-[calc(100vh-12vh)] bg-gray-100">
      <div className="absolute top-4 left-4 z-10 bg-white/80 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">VIT Hostel - Three Bedded Room</h2>
        <p className="text-sm text-gray-600">
          Use mouse to interact:<br />
          • Left click + drag to rotate<br />
          • Right click + drag to pan<br />
          • Scroll to zoom
        </p>
      </div>
      <Canvas camera={{ position: [20, 15, 20], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 8, 0]} intensity={0.5} />
        <pointLight position={[-6, 6, -8]} intensity={0.3} color="#ffd700" />
        <pointLight position={[-6, 6, 0]} intensity={0.3} color="#ffd700" />
        <pointLight position={[-6, 6, 8]} intensity={0.3} color="#ffd700" />
        <Environment preset="apartment" />
        <Room />
        <OrbitControls 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={8}
          maxDistance={40}
        />
      </Canvas>
    </div>
  );
};

export default RoomView3D; 
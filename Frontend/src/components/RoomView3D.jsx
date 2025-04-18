import React, { useEffect, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as THREE from 'three';
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
        <meshStandardMaterial color="#F5F5DC" />
      </Plane>
      <Plane args={[3, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#DEB887" />
      </Plane>

      {/* Left Side (Beds) */}
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
          {/* Mattress Pattern */}
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
      {[-4, 4].map((zPosition) => (
        <group key={`fan-${zPosition}`}>
          <Cylinder args={[0.1, 0.1, 0.5, 8]} position={[-4, 8.7, zPosition]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Cylinder>
          <Box args={[4, 0.1, 0.5]} position={[-4, 8.5, zPosition]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Box>
          <Box args={[0.5, 0.1, 4]} position={[-4, 8.5, zPosition]}>
        <meshStandardMaterial color="#c0c0c0" />
          </Box>
        </group>
      ))}

      {/* Windows and Curtains */}
      {[-8, 0, 8].map((zPosition) => (
        <group key={`window-${zPosition}`}>
          {/* Window Frame */}
          <Box args={[0.3, 5, 3]} position={[5.85, 4.5, zPosition]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          {/* Window Glass */}
          <Box args={[0.1, 4.8, 2.8]} position={[5.85, 4.5, zPosition]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
          </Box>
          {/* Curtain Rod */}
          <Cylinder args={[0.05, 0.05, 4, 8]} rotation={[0, 0, Math.PI/2]} position={[5.75, 7, zPosition]}>
            <meshStandardMaterial color="#8b4513" />
          </Cylinder>
          {/* Curtains */}
          <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, zPosition - 1]}>
            <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
          </Box>
          <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, zPosition + 1]}>
            <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
          </Box>
        </group>
      ))}
    </>
  );
};

const SingleRoom = () => {
  // Single room layout with one set of furniture
  return (
    <>
      {/* Room walls */}
      <Box args={[12, 9, 12]} position={[0, 4.5, 0]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} side={2} />
      </Box>

      {/* Floor with beige side tiles */}
      <Plane args={[12, 12]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Plane>
      <Plane args={[3, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#DEB887" />
      </Plane>

      {/* Single Bed */}
      <group>
        {/* Bed Base with Storage */}
        <Box args={[2.5, 0.6, 6]} position={[-4, 0.3, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Storage Front Panel */}
        <Box args={[2.5, 0.4, 0.05]} position={[-4, 0.2, 2.975]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        <Box args={[2.5, 0.4, 0.05]} position={[-4, 0.2, -2.975]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Bed Frame Side Rails */}
        <Box args={[0.1, 0.3, 6]} position={[-2.8, 0.45, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        <Box args={[0.1, 0.3, 6]} position={[-5.2, 0.45, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Headboard */}
        <Box args={[2.5, 1.2, 0.1]} position={[-4, 0.9, -3]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Mattress */}
        <Box args={[2.3, 0.2, 5.8]} position={[-4, 0.7, 0]}>
          <meshStandardMaterial color="#87CEEB" />
        </Box>
        {/* Mattress Pattern */}
        <Box args={[2.2, 0.01, 5.7]} position={[-4, 0.81, 0]}>
          <meshStandardMaterial color="#4FA4DE" />
        </Box>
      </group>

      {/* Single Wardrobe */}
      <group>
        {/* Wardrobe */}
        <Box args={[2.5, 8, 3]} position={[4, 4, 0]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Door Line */}
        <Box args={[0.05, 7.8, 0.05]} position={[4, 4, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Door Handles */}
        <Box args={[0.1, 0.3, 0.1]} position={[5.2, 4, -0.6]}>
          <meshStandardMaterial color="#c0c0c0" />
        </Box>
        <Box args={[0.1, 0.3, 0.1]} position={[5.2, 4, 0.6]}>
          <meshStandardMaterial color="#c0c0c0" />
        </Box>
        {/* Lock */}
        <Box args={[0.15, 0.15, 0.15]} position={[5.2, 4.5, 0]}>
          <meshStandardMaterial color="#000000" />
        </Box>
      </group>

      {/* Single Study Area */}
      <group>
        {/* Dark Brown Backboard */}
        <Box args={[0.1, 4, 2.8]} position={[2.7, 3, 4]}>
          <meshStandardMaterial color="#3a2a1a" />
        </Box>
        {/* Study Desk */}
        <Box args={[2.5, 0.05, 2.8]} position={[2.7, 2.3, 4]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Upper Storage */}
        <Box args={[1.5, 0.05, 2.8]} position={[2.7, 3.5, 4]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        <Box args={[1.5, 0.05, 2.8]} position={[2.7, 4.5, 4]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Storage Walls */}
        <Box args={[1.5, 1, 0.05]} position={[2.7, 4, 2.6]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        <Box args={[1.5, 1, 0.05]} position={[2.7, 4, 5.4]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>

        {/* Chair */}
        <Box args={[0.1, 1.2, 0.8]} position={[1.8, 1.6, 4]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.8, 0.1, 0.8]} position={[2.2, 1.1, 4]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.7, 0.1, 0.7]} position={[2.2, 1.2, 4]}>
          <meshStandardMaterial color="#8b2500" />
        </Box>
        {/* Chair Legs */}
        <Box args={[0.1, 1.1, 0.1]} position={[2.0, 0.55, 3.7]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[2.0, 0.55, 4.3]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[2.4, 0.55, 3.7]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[2.4, 0.55, 4.3]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
      </group>

      {/* Single Ceiling Fan */}
      <group>
        <Cylinder args={[0.1, 0.1, 0.5, 8]} position={[-4, 8.7, 0]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Cylinder>
        <Box args={[4, 0.1, 0.5]} position={[-4, 8.5, 0]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Box>
        <Box args={[0.5, 0.1, 4]} position={[-4, 8.5, 0]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Box>
      </group>

      {/* Window and Curtain */}
      <group>
        {/* Window Frame */}
        <Box args={[0.3, 5, 3]} position={[5.85, 4.5, 0]}>
        <meshStandardMaterial color="#ffffff" />
        </Box>
        {/* Window Glass */}
        <Box args={[0.1, 4.8, 2.8]} position={[5.85, 4.5, 0]}>
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
        </Box>
        {/* Curtain Rod */}
        <Cylinder args={[0.05, 0.05, 4, 8]} rotation={[0, 0, Math.PI/2]} position={[5.75, 7, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Cylinder>
        {/* Curtains */}
        <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, -1]}>
          <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
        </Box>
        <Box args={[0.1, 5, 1.5]} position={[5.8, 4.5, 1]}>
          <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
        </Box>
      </group>

      {/* Full-Length Mirror */}
      <group>
        {/* Mirror Glass */}
        <Box args={[0.05, 5, 2]} position={[0, 4, -5.9]}>
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </Box>
        {/* Mirror Frame */}
        <Box args={[0.1, 5.2, 2.2]} position={[0, 4, -5.95]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
      </group>
    </>
  );
};

const TwoSeaterRoom = () => {
  return (
    <>
      {/* Room walls */}
      <Box args={[12, 9, 16]} position={[0, 4.5, 0]}>
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} side={2} />
      </Box>

      {/* Floor with beige side tiles */}
      <Plane args={[12, 16]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Plane>
      <Plane args={[3, 14]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#DEB887" />
      </Plane>

      {/* Left Side Setup */}
      {/* First Wardrobe (Left Side) */}
      <group>
        <Box args={[2.5, 8, 3]} position={[-4, 4, -6]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Door Line */}
        <Box args={[0.05, 7.8, 0.05]} position={[-4, 4, -6]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Door Handles */}
        <Box args={[0.1, 0.3, 0.1]} position={[-2.8, 4, -6.6]}>
          <meshStandardMaterial color="#c0c0c0" />
        </Box>
        <Box args={[0.1, 0.3, 0.1]} position={[-2.8, 4, -5.4]}>
          <meshStandardMaterial color="#c0c0c0" />
        </Box>
        {/* Lock */}
        <Box args={[0.15, 0.15, 0.15]} position={[-2.8, 4.5, -6]}>
          <meshStandardMaterial color="#000000" />
        </Box>
      </group>

      {/* First Bed (Left Side) */}
      <group>
        {/* Bed Base with Storage */}
        <Box args={[2.5, 0.6, 6]} position={[-4, 0.3, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Storage Front Panel */}
        <Box args={[2.5, 0.4, 0.05]} position={[-4, 0.2, 2.975]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        <Box args={[2.5, 0.4, 0.05]} position={[-4, 0.2, -2.975]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Bed Frame Side Rails */}
        <Box args={[0.1, 0.3, 6]} position={[-2.8, 0.45, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        <Box args={[0.1, 0.3, 6]} position={[-5.2, 0.45, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Headboard */}
        <Box args={[2.5, 1.2, 0.1]} position={[-4, 0.9, -3]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Mattress */}
        <Box args={[2.3, 0.2, 5.8]} position={[-4, 0.7, 0]}>
          <meshStandardMaterial color="#87CEEB" />
        </Box>
        {/* Mattress Pattern */}
        <Box args={[2.2, 0.01, 5.7]} position={[-4, 0.81, 0]}>
          <meshStandardMaterial color="#4FA4DE" />
        </Box>
      </group>

      {/* First Study Area (Left Side) */}
      <group>
        {/* Dark Brown Backboard */}
        <Box args={[0.1, 4, 2.8]} position={[-4, 3, 5]}>
          <meshStandardMaterial color="#3a2a1a" />
        </Box>
        {/* Study Desk */}
        <Box args={[2.5, 0.05, 2.8]} position={[-4, 2.3, 5]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Upper Storage */}
        <Box args={[1.5, 0.05, 2.8]} position={[-4, 3.5, 5]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        <Box args={[1.5, 0.05, 2.8]} position={[-4, 4.5, 5]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Storage Walls */}
        <Box args={[1.5, 1, 0.05]} position={[-4, 4, 3.6]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        <Box args={[1.5, 1, 0.05]} position={[-4, 4, 6.4]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>

        {/* Chair */}
        <Box args={[0.1, 1.2, 0.8]} position={[-2.8, 1.6, 5]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.8, 0.1, 0.8]} position={[-3.2, 1.1, 5]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.7, 0.1, 0.7]} position={[-3.2, 1.2, 5]}>
          <meshStandardMaterial color="#8b2500" />
        </Box>
        {/* Chair Legs */}
        <Box args={[0.1, 1.1, 0.1]} position={[-3.0, 0.55, 4.7]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[-3.0, 0.55, 5.3]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[-3.4, 0.55, 4.7]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[-3.4, 0.55, 5.3]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
      </group>

      {/* Right Side Setup */}
      {/* Second Wardrobe (Right Side) */}
      <group>
        <Box args={[2.5, 8, 3]} position={[4, 4, -6]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Door Line */}
        <Box args={[0.05, 7.8, 0.05]} position={[4, 4, -6]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Door Handles */}
        <Box args={[0.1, 0.3, 0.1]} position={[2.8, 4, -6.6]}>
          <meshStandardMaterial color="#c0c0c0" />
        </Box>
        <Box args={[0.1, 0.3, 0.1]} position={[2.8, 4, -5.4]}>
          <meshStandardMaterial color="#c0c0c0" />
        </Box>
        {/* Lock */}
        <Box args={[0.15, 0.15, 0.15]} position={[2.8, 4.5, -6]}>
          <meshStandardMaterial color="#000000" />
        </Box>
      </group>

      {/* Second Bed (Right Side) */}
      <group>
        {/* Bed Base with Storage */}
        <Box args={[2.5, 0.6, 6]} position={[4, 0.3, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Storage Front Panel */}
        <Box args={[2.5, 0.4, 0.05]} position={[4, 0.2, 2.975]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        <Box args={[2.5, 0.4, 0.05]} position={[4, 0.2, -2.975]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Bed Frame Side Rails */}
        <Box args={[0.1, 0.3, 6]} position={[2.8, 0.45, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        <Box args={[0.1, 0.3, 6]} position={[5.2, 0.45, 0]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Headboard */}
        <Box args={[2.5, 1.2, 0.1]} position={[4, 0.9, -3]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        {/* Mattress */}
        <Box args={[2.3, 0.2, 5.8]} position={[4, 0.7, 0]}>
          <meshStandardMaterial color="#87CEEB" />
        </Box>
        {/* Mattress Pattern */}
        <Box args={[2.2, 0.01, 5.7]} position={[4, 0.81, 0]}>
          <meshStandardMaterial color="#4FA4DE" />
        </Box>
      </group>

      {/* Second Study Area (Right Side) */}
      <group>
        {/* Dark Brown Backboard */}
        <Box args={[0.1, 4, 2.8]} position={[4, 3, 5]}>
          <meshStandardMaterial color="#3a2a1a" />
        </Box>
        {/* Study Desk */}
        <Box args={[2.5, 0.05, 2.8]} position={[4, 2.3, 5]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Upper Storage */}
        <Box args={[1.5, 0.05, 2.8]} position={[4, 3.5, 5]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        <Box args={[1.5, 0.05, 2.8]} position={[4, 4.5, 5]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        {/* Storage Walls */}
        <Box args={[1.5, 1, 0.05]} position={[4, 4, 3.6]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>
        <Box args={[1.5, 1, 0.05]} position={[4, 4, 6.4]}>
          <meshStandardMaterial color="#d2b48c" />
        </Box>

        {/* Chair */}
        <Box args={[0.1, 1.2, 0.8]} position={[2.8, 1.6, 5]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.8, 0.1, 0.8]} position={[3.2, 1.1, 5]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.7, 0.1, 0.7]} position={[3.2, 1.2, 5]}>
          <meshStandardMaterial color="#8b2500" />
        </Box>
        {/* Chair Legs */}
        <Box args={[0.1, 1.1, 0.1]} position={[3.0, 0.55, 4.7]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[3.0, 0.55, 5.3]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[3.4, 0.55, 4.7]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
        <Box args={[0.1, 1.1, 0.1]} position={[3.4, 0.55, 5.3]}>
          <meshStandardMaterial color="#deb887" />
        </Box>
      </group>

      {/* Ceiling Fans */}
      {[-4, 4].map((zPosition) => (
        <group key={`fan-${zPosition}`}>
          <Cylinder args={[0.1, 0.1, 0.5, 8]} position={[0, 8.7, zPosition]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Cylinder>
          <Box args={[4, 0.1, 0.5]} position={[0, 8.5, zPosition]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
          <Box args={[0.5, 0.1, 4]} position={[0, 8.5, zPosition]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
        </group>
      ))}

      {/* Windows */}
      {[-4, 4].map((zPosition) => (
        <group key={`window-${zPosition}`}>
          {/* Window Frame */}
          <Box args={[0.3, 5, 3]} position={[0, 4.5, zPosition + 7]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          {/* Window Glass */}
          <Box args={[0.1, 4.8, 2.8]} position={[0, 4.5, zPosition + 7]}>
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
          </Box>
      {/* Curtain Rod */}
          <Cylinder args={[0.05, 0.05, 4, 8]} rotation={[0, 0, Math.PI/2]} position={[0, 7, zPosition + 7]}>
        <meshStandardMaterial color="#8b4513" />
      </Cylinder>
          {/* Curtains */}
          <Box args={[0.1, 5, 1.5]} position={[0, 4.5, zPosition + 6]}>
            <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
          </Box>
          <Box args={[0.1, 5, 1.5]} position={[0, 4.5, zPosition + 8]}>
            <meshStandardMaterial color="#FFE4E1" transparent opacity={0.8} />
          </Box>
        </group>
      ))}
    </>
  );
};

const FourSeaterRoom = () => {
  return (
    <>
      {/* Room walls - Pink color */}
      <Box args={[16, 9, 20]} position={[0, 4.5, 0]}>
        <meshStandardMaterial color="#FFB6C1" transparent opacity={0.2} side={2} />
      </Box>

      {/* Floor with beige side tiles */}
      <Plane args={[16, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Plane>
      <Plane args={[4, 18]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#DEB887" />
      </Plane>

      {/* Four Beds in a row */}
      {[-6, -2, 2, 6].map((xPos, index) => (
        <group key={`bed-${index}`}>
          {/* Bed Base with Storage */}
          <Box args={[2.5, 0.6, 6]} position={[xPos, 0.3, 5]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Storage Front Panel */}
          <Box args={[2.5, 0.4, 0.05]} position={[xPos, 0.2, 7.975]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          <Box args={[2.5, 0.4, 0.05]} position={[xPos, 0.2, 2.025]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Bed Frame Side Rails */}
          <Box args={[0.1, 0.3, 6]} position={[xPos + 1.2, 0.45, 5]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          <Box args={[0.1, 0.3, 6]} position={[xPos - 1.2, 0.45, 5]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Headboard */}
          <Box args={[2.5, 1.2, 0.1]} position={[xPos, 0.9, 8]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Mattress */}
          <Box args={[2.3, 0.2, 5.8]} position={[xPos, 0.7, 5]}>
            <meshStandardMaterial color="#87CEEB" />
          </Box>
          {/* Mattress Pattern */}
          <Box args={[2.2, 0.01, 5.7]} position={[xPos, 0.81, 5]}>
            <meshStandardMaterial color="#4FA4DE" />
          </Box>
        </group>
      ))}

      {/* Left Wall Almirahs */}
      {[-7.5, -7.5].map((xPos, index) => (
        <group key={`left-almirah-${xPos}-${index}`}>
          <Box args={[2.5, 8, 3]} position={[xPos, 4, index * 6 - 3]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          {/* Door Line */}
          <Box args={[0.05, 7.8, 0.05]} position={[xPos, 4, index * 6 - 3]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Door Handles */}
          <Box args={[0.1, 0.3, 0.1]} position={[xPos + 1.2, 4, index * 6 - 3.6]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
          <Box args={[0.1, 0.3, 0.1]} position={[xPos + 1.2, 4, index * 6 - 2.4]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
          {/* Lock */}
          <Box args={[0.15, 0.15, 0.15]} position={[xPos + 1.2, 4.5, index * 6 - 3]}>
            <meshStandardMaterial color="#000000" />
          </Box>
        </group>
      ))}

      {/* Right Wall Almirahs */}
      {[7.5, 7.5].map((xPos, index) => (
        <group key={`right-almirah-${xPos}-${index}`}>
          <Box args={[2.5, 8, 3]} position={[xPos, 4, index * 6 - 3]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          {/* Door Line */}
          <Box args={[0.05, 7.8, 0.05]} position={[xPos, 4, index * 6 - 3]}>
            <meshStandardMaterial color="#8b4513" />
          </Box>
          {/* Door Handles */}
          <Box args={[0.1, 0.3, 0.1]} position={[xPos - 1.2, 4, index * 6 - 3.6]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
          <Box args={[0.1, 0.3, 0.1]} position={[xPos - 1.2, 4, index * 6 - 2.4]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
          {/* Lock */}
          <Box args={[0.15, 0.15, 0.15]} position={[xPos - 1.2, 4.5, index * 6 - 3]}>
            <meshStandardMaterial color="#000000" />
          </Box>
        </group>
      ))}

      {/* Study Tables and Chairs - Against Entry Wall */}
      {[-6, -2, 2, 6].map((xPos) => (
        <group key={`study-${xPos}`}>
          {/* Dark Brown Backboard */}
          <Box args={[2.8, 4, 0.1]} position={[xPos, 3, -9.5]}>
            <meshStandardMaterial color="#3a2a1a" />
          </Box>
          {/* Study Desk */}
          <Box args={[2.8, 0.05, 2.5]} position={[xPos, 2.3, -8.5]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          {/* Upper Storage */}
          <Box args={[2.8, 0.05, 1.5]} position={[xPos, 3.5, -9]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          <Box args={[2.8, 0.05, 1.5]} position={[xPos, 4.5, -9]}>
            <meshStandardMaterial color="#d2b48c" />
          </Box>
          {/* Chair */}
          <Box args={[0.8, 1.2, 0.1]} position={[xPos, 1.6, -7.5]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.8, 0.1, 0.8]} position={[xPos, 1.1, -7]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.7, 0.1, 0.7]} position={[xPos, 1.2, -7]}>
            <meshStandardMaterial color="#8b2500" />
          </Box>
          {/* Chair Legs */}
          <Box args={[0.1, 1.1, 0.1]} position={[xPos - 0.3, 0.55, -7]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.1, 1.1, 0.1]} position={[xPos + 0.3, 0.55, -7]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.1, 1.1, 0.1]} position={[xPos - 0.3, 0.55, -6.7]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
          <Box args={[0.1, 1.1, 0.1]} position={[xPos + 0.3, 0.55, -6.7]}>
            <meshStandardMaterial color="#deb887" />
          </Box>
        </group>
      ))}

      {/* Ceiling Fans */}
      {[-4, 4].map((xPos) => (
        <group key={`fan-${xPos}`}>
          <Cylinder args={[0.1, 0.1, 0.5, 8]} position={[xPos, 8.7, 0]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Cylinder>
          <Box args={[4, 0.1, 0.5]} position={[xPos, 8.5, 0]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
          <Box args={[0.5, 0.1, 4]} position={[xPos, 8.5, 0]}>
            <meshStandardMaterial color="#c0c0c0" />
          </Box>
        </group>
      ))}

      {/* Tube Lights */}
      {[-4, 4].map((xPos) => (
        <group key={`tubelight-${xPos}`}>
          {/* Tube Light Housing */}
          <Box args={[4, 0.2, 0.6]} position={[xPos, 8.7, -6]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          {/* Tube Light Glow */}
          <Box args={[3.8, 0.1, 0.4]} position={[xPos, 8.65, -6]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </Box>
        </group>
      ))}

      {/* Entry Gate */}
      <Box args={[3, 7, 0.3]} position={[0, 3.5, -9.85]}>
        <meshStandardMaterial color="#8b4513" />
      </Box>
      {/* Door Handle */}
      <Box args={[0.2, 0.4, 0.1]} position={[0.8, 3.5, -9.7]}>
        <meshStandardMaterial color="#c0c0c0" />
      </Box>
    </>
  );
};

const LoadingScreen = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100">
    <div className="text-lg font-semibold text-gray-700">Loading 3D View...</div>
  </div>
);

const RoomView3D = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hostel, roomType } = location.state || {};

  useEffect(() => {
    if (!hostel || !roomType) {
      navigate('/room-view-3d-selection');
    }
  }, [hostel, roomType, navigate]);

  if (!hostel || !roomType) {
    return null;
  }

  const getRoomComponent = () => {
    if (hostel === 'gh1' || hostel === 'gh2') {
      switch (roomType) {
        case '1': return <SingleRoom />;
        case '2': return <TwoSeaterRoom />;
        case '3': return <Room />;
        case '4': return <FourSeaterRoom />;
        default: return null;
      }
    }
    return null;
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="absolute top-4 left-4 z-10 bg-white/80 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {hostel === 'gh1' ? 'Girls Hostel Block 1' : 'Girls Hostel Block 2'} - {roomType} Seater Room
        </h2>
        <p className="text-sm text-gray-600">
          Use mouse to interact:<br />
          • Left click + drag to rotate<br />
          • Right click + drag to pan<br />
          • Scroll to zoom
        </p>
        <button
          onClick={() => navigate('/room-view-3d-selection')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Back to Selection
        </button>
      </div>
      
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          shadows
          gl={{ antialias: true }}
          camera={{
            position: [15, 15, 15],
            fov: 50,
            near: 0.1,
            far: 1000
          }}
          style={{ background: '#f0f0f0' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
        <pointLight position={[0, 8, 0]} intensity={0.5} />
        <Environment preset="apartment" />
          {getRoomComponent()}
        <OrbitControls 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={30}
        />
      </Canvas>
      </Suspense>
    </div>
  );
};

export default RoomView3D; 
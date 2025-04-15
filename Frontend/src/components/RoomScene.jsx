import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

function RoomModel() {
  const { scene } = useGLTF('/assets/3bedflat.glb'); // Ensure your path is correct

  // Apply white color to all mesh materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(0xffffff); // Set color to white
        child.material.needsUpdate = true;  // Update the material
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1} />;
}

export default function RoomScene() {
  return (
    <Canvas shadows style={{ width: '100%', height: '100vh' }} >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
        <PerspectiveCamera makeDefault position={[5, 5, 10]} fov={50} />
        <OrbitControls />
        <Environment preset="apartment" />
        <RoomModel />
      </Suspense>
    </Canvas>
  );
}

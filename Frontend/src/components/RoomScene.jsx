import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useGLTF,
} from "@react-three/drei";

function RoomModel({ bedType }) {
  const modelMap = {
    "2-bedflat": "/assets/2bedflat.glb",
    "3-bedflat": "/assets/3bedflat.glb",
    "4-bedflat": "/assets/3bedflat.glb",
  };

  const modelPath = modelMap[bedType] || modelMap["3-bed"];
  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} scale={1} />;
}

export default function RoomScene({ bedType, hostel }) {
  return (
    <div className="relative w-full pt-[12vh] h-screen bg-red-300 pt-12vh">
      <div className="absolute top-4 right-4 z-10 bg-white/80 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {hostel === "gh1"
            ? "Girls Hostel Block 1"
            : hostel === "gh2"
            ? "Girls Hostel Block 2"
            : hostel === "gh3"
            ? "Girls Hostel Block 3"
            : hostel === "bh1"
            ? "Boys Hostel Block 1"
            : "Boys Hostel Block 2"}{" "}
          - {bedType}
        </h2>
        <p className="text-sm text-gray-600">
          Use mouse to interact:
          <br />
          • Left click + drag to rotate
          <br />
          • Right click + drag to pan
          <br />• Scroll to zoom
        </p>
      </div>

      {/* 3D Scene */}
      <Canvas shadows style={{ width: "100%", height: "100%" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0} />
          <PerspectiveCamera makeDefault position={[5, 5, 10]} fov={50} />
          <OrbitControls />
          <Environment preset="apartment" />
          <RoomModel bedType={bedType} />
        </Suspense>
      </Canvas>
    </div>
  );
}

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function GlobeModel() {
  const { scene } = useGLTF("/assets/globe.glb");
  return <primitive object={scene} scale={1} />;
}

export default function LoginGlobe() {
  return (
    <Canvas className="w-full h-full">
      {/* lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* interactive camera controls */}
      <OrbitControls enableZoom={true} enablePan={false} />

      {/* 3D globe */}
      <GlobeModel />
    </Canvas>
  );
}

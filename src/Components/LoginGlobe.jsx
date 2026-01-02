// import React, { useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// // import globe from "../assets/globe.glb"
// // import abstract_globe from "../assets/abstract_globe.glb";
// // import satellite_comms from "../assets/satellite_comms.glb";
// import ground_satellite_station1 from "../assets/ground_satellite1.glb";

// useGLTF.preload(ground_satellite_station1);

// function GlobeModel() {
//   const { scene } = useGLTF(ground_satellite_station1);
//   scene.position.y = -0.8;
//   return <primitive object={scene} scale={2} />;
// }

// export default function LoginGlobe() {
//   return (
//     <Canvas className="w-full h-full">
//       {/* lighting */}
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={2} />

//       {/* interactive camera controls */}
//       <OrbitControls
//     enableZoom={true}
//     enablePan={false}
//     rotateSpeed={0.5}
//     autoRotate={true}
//     autoRotateSpeed={10}
//     minDistance={2}  
//   maxDistance={5}
//   />

//       <GlobeModel />

//     </Canvas>
//   );
// }
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Box3, Vector3 } from "three";
import ground_satellite1 from "../assets/ground_satellite1.glb";

function GlobeModel() {
  const { scene } = useGLTF(ground_satellite1);

  useEffect(() => {
 
    const box = new Box3().setFromObject(scene);
    const center = new Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    const size = new Vector3();
    box.getSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxDimension; 
    scene.scale.set(scale, scale, scale);
  }, [scene]);

  return <primitive object={scene} />;
}

useGLTF.preload(ground_satellite1);

export default function LoginGlobe() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      <GlobeModel />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={true}
        autoRotateSpeed={10}
        minDistance={4}
        maxDistance={10}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

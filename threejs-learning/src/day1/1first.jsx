import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Cube({position, color}) {
  const cubeRef = useRef();

  // useFrame runs 60 times/sec
  useFrame((state, delta) => {
    // cubeRef.current.rotation.x += delta;
    // cubeRef.current.rotation.y += delta * 0.7;
  });

  return (
    <mesh ref={cubeRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function First() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} />
        {/* <Cube position={[0,0,1]} /> */}
         <Cube position={[0, 0, 0]} color='green' />
  <Cube position={[2, 0, 0]} color='red' />
  <Cube position={[-2, 0, 0]} color='blue' />
  <Cube position={[0, 2, 0]} color='white' />
  <Cube position={[0, -2, 0]} color='pink' />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

// Canvas = 3D drawing area or scene
// mesh = 3D object
// geometry = shape
// material = color
// useFrame = animation
// OrbitControls = drag to rotate view
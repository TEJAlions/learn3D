import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
// import husky from '../../public/3dmodels/Husky.glb'
import * as THREE from "three";

function Model() {
  const ref = useRef();
  const { scene } = useGLTF('/3dmodels/Husky.glb');

  // Compute bounding box
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  // Auto-scale
  const maxAxis = Math.max(size.x, size.y, size.z);
  const scale = 1.5 / maxAxis;
  scene.scale.set(scale, scale, scale);

  // Center pivot
  scene.position.sub(center);

  // Shadows
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Animation
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;

    // Smooth scaling bounce
    const bounce = 0.1 * Math.sin(state.clock.elapsedTime * 2);
    ref.current.scale.set(1 + bounce, 1 + bounce, 1 + bounce);
  });

  return <primitive ref={ref} object={scene} position={[0, 0.1, 0]} />;
}

function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>   
        <planeGeometry args={[20, 20]} />   
        <meshStandardMaterial color="orange" />
    </mesh>
  );
}
function PointLight() {
  return <pointLight castShadow position={[0, 4, 1]} intensity={1} />;
}
function DirectionalLight() {
    return (
        <directionalLight
            position={[10, 10, 40]}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
    )
}

export default function LoadModel() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [10,10,10], fov: 60 }} shadows>
        <ambientLight intensity={1} />
        <DirectionalLight />
        <Model />
        <Plane />
        <PointLight />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

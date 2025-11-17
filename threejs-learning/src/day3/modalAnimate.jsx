import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";


 function AnimatedModel() {
  const group = useRef();

  // Load model + animations
  const { scene, animations } = useGLTF('/3dmodels/Husky.glb');
  
  // Connect animation system
  const { actions, names } = useAnimations(animations, group);
  
  console.log('animations', animations,  'actions', actions, 'names', names);
  useEffect(() => {
      // Play the default animation
    const firstClip = "Gallop_Jump";
    actions[firstClip]?.play();
    // actions[firstClip]?.reset().fadeIn(5).play();
    // actions[firstClip].reset().setLoop(THREE.LoopOnce).play();
// actions[firstClip].clampWhenFinished = true;
    // return () => actions[firstClip]?.fadeOut(5);
  }, [actions, names]);

  return <primitive ref={group} object={scene} scale={1.5}  
  onClick={() => {
      // const next = names[Math.floor(Math.random() * names.length)];
      // Object.values(actions).forEach((a) => a.stop());
      // actions[next].reset().play();
      actions["Walk"].reset().fadeIn(5).play();
      actions["Gallop_Jump"].fadeOut(5);
      // actions["Gallop_Jump"].reset().play();
    }} 
    />;
}
function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>   
        <planeGeometry args={[20, 20]} />   
        <meshStandardMaterial color="orange" />
    </mesh>
  );
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


export default function AnimationModel() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [3, 2, 6] }}>
        <ambientLight intensity={1} />
        <DirectionalLight />
        <Plane />

        <AnimatedModel />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";


function Husky() {
    const [currentAnimation, setCurrentAnimation] = useState(null);
    const ref = useRef();

    // Load model + animations
    const { scene, animations } = useGLTF('/3dmodels/Husky.glb');
    const { actions, names } = useAnimations(animations, ref);
    // Shadows
  scene.traverse((child) => {
    console.log(child)
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }});

     // Play animation when currentAnimation changes
  useEffect(() => {
    if (!actions || !currentAnimation) return;

  // Stop everything
    Object.values(actions).forEach((a) => a.stop());

    // Fade in selected animation
    const newAction = actions[currentAnimation];
    newAction.reset().fadeIn(0.5).play().setLoop(THREE.LoopOnce);
    newAction.clampWhenFinished = true;
    actions["Idle"].reset().fadeIn(0.5).play();

  }, [currentAnimation, actions]);

  // Set first animation once
  useEffect(() => {
    if (names.length > 0 && !currentAnimation) {
      setCurrentAnimation(names[0]);
    }
  }, [names]);

    function chnageAnimation() {
    setCurrentAnimation(names[Math.floor(Math.random() * names?.length)]);
}
function handleHover() {
    setCurrentAnimation("Idle_2")
}
function handleDoubleClick() {
    setCurrentAnimation("Death")
}
    return <group onClick={chnageAnimation} onPointerEnter={handleHover} onDoubleClick={handleDoubleClick} >
    <primitive castShadow ref={ref} object={scene} scale={1.5} />
    </group>

}

function Plane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

function DirectionalLight() {
    return (
        <directionalLight
            position={[10, 50, 40]}
            intensity={0.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
    )
}
function SpotLight() {
    return (
        <spotLight position={[10,9,10]} angle={5} castShadow intensity={50} />
    )
}


export default function AnimatedModel() {
    return (
            <div className="w-full h-screen bg-black">
        <Canvas camera={{ position: [10,10,10], fov: 60 }} shadows>
            <ambientLight intensity={1} />
        <Husky />
            <Plane />
            <DirectionalLight />
            <OrbitControls />
            <SpotLight />
        </Canvas>

        </div>
    )
}
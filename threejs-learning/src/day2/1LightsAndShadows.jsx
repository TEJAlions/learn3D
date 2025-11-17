// Import Canvas component from React Three Fiber for rendering 3D scenes
import { Canvas, useFrame } from "@react-three/fiber";
// Import OrbitControls from Drei for camera controls (rotate, zoom, pan)
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

// Ground component - creates a large plane that receives shadows
function Ground() {
  return (
    // mesh: 3D object container
    // rotation={[-Math.PI / 2, 0, 0]}: rotates 90° on X-axis to lay flat (horizontal)
    // receiveShadow: enables this surface to display shadows cast by other objects
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      {/* planeGeometry: creates a 2D rectangular surface */}
      {/* args={[20, 20]}: 20 units wide × 20 units tall */}
      <planeGeometry args={[20, 20]} />
      
      {/* meshStandardMaterial: realistic material with lighting response */}
      {/* color="orange": sets the surface to orange */}
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

// Cube component - creates a cube that casts shadows
function Cube() {
    const cubeRef = useRef();
    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta; // rotate cube around Y-axis
    });

  return (
    // mesh: 3D object container
    // position={[0, 1, 0]}: places cube at X=0, Y=1 (above ground), Z=0
    // castShadow: allows this object to cast shadows onto other surfaces
    <mesh ref={cubeRef} position={[0, 1, 0]} castShadow>
      {/* boxGeometry: creates a cube shape */}
      {/* args={[1, 1, 1]}: 1 unit in all dimensions (width × height × depth) */}
      <boxGeometry args={[1, 1, 1]} />
      
      {/* meshStandardMaterial: realistic material */}
      {/* color="white": sets the cube to white */}
      <meshToonMaterial   color="white" />
    </mesh>
  );
}

// Main component: LightsAndShadows scene
export default function LightsAndShadows() {
  return (
    // Container div: full-screen black background
    <div className="w-full h-screen bg-black">
      {/* Canvas: R3F rendering container for 3D scene */}
      <Canvas
        shadows
        // shadows: enables shadow rendering in the scene
        camera={{ position: [4, 4, 6], fov: 50 }}
        // camera: sets initial camera position (X=4, Y=4, Z=6)
        // fov: field of view in degrees (50° = moderate zoom)
      >
        {/* ambientLight: uniform light from all directions */}
        {/* intensity={0.2}: low brightness (20%) for subtle base lighting */}
        {/* <ambientLight intensity={1} /> */}

        {/* directionalLight: simulates sun-like light from a direction */}
        {/* <directionalLight
          position={[5, 5, 5]}
          // position: light comes from coordinates (5, 5, 5) - upper right
          
          intensity={1.5}
          // intensity: brightness level (150% of default)
          
          castShadow
          // castShadow: enables this light to cast shadows from objects
          
          shadow-mapSize-width={2048}
          // shadow-mapSize-width: shadow resolution width (2048px - high quality)
          
          shadow-mapSize-height={2048}
          // shadow-mapSize-height: shadow resolution height (2048px)
        /> */}
        <pointLight castShadow 
         shadow-mapSize={[4096, 4096]}

    shadow-bias={-0.001}
        position={[0, 3, 0]} intensity={20} />
        {/* <spotLight position={[1,2,5]} angle={0.6} castShadow intensity={20} /> */}
        {/* <hemisphereLight skyColor="blue" groundColor="red" intensity={0.7} /> */}
        {/* <rectAreaLight castShadow position={0, 50,0 } width={5} height={5} intensity={10} color="white" /> */}



        {/* Render the Cube component */}
        <Cube />
        
        {/* Render the Ground component */}
        <Ground />

        {/* OrbitControls: allows user to rotate, zoom, and pan camera with mouse */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

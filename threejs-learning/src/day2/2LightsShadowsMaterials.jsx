import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Plane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

function DirectionalLight() {
    // DirectionalLight: simulates sun-like parallel light rays
    // Limitations: casts uniform shadows across entire scene (not perspective-based)
    // Good for: outdoor scenes, large environments
    // shadow-mapSize: controls shadow quality (higher = more detail but slower performance)
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

function SpotLight() {
    // SpotLight: cone-shaped light like a flashlight or stage light
    // Limitations: intensity range 1-5 (higher values cause shadow burnout/flickering)
    // angle: controls cone width (lower = tighter beam, higher = wider spread)
    // Good for: focused lighting, dramatic shadows, theatrical effects
    return (
        <spotLight position={[-8, 1.2, 9]} angle={0.5} castShadow intensity={5} />
    )
}

function PointLight() {
    // PointLight: omni-directional light like a light bulb
    // Limitations: computationally expensive (avoid too many in scene)
    // Good for: realistic point sources, localized lighting
    // Note: no angle property (radiates in all directions)
    return <pointLight castShadow position={[-6.2, 1, 4.2]} intensity={2} />
}

function HemisphereLight() {
    // HemisphereLight: two-color lighting (sky above, ground below)
    // Limitations: no shadows (doesn't cast or receive)
    // Good for: ambient outdoor lighting, fast and efficient
    // skyColor: light from above, groundColor: light from below
    return <hemisphereLight skyColor="blue" groundColor="black" intensity={0.7} />
}

function RectAreaLight() {
    // RectAreaLight: rectangular light source (like window or panel light)
    // Limitations: only works with MeshStandard/Physical materials (NOT with Basic or Toon)
    // Good for: indoor scenes, realistic area lighting
    // width/height: define light source dimensions
    return <rectAreaLight castShadow position={[0, 5, 10]} width={5} height={5} intensity={10} color="red" />
}

function Box() {
    const boxRef = useRef();
    useFrame((state, delta) => {
        boxRef.current.rotation.y += delta;
    });
    return (
        <mesh ref={boxRef} position={[7, 0.5, 7]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            {/* meshStandardMaterial: realistic, responds to all lights, good for most objects */}
            <meshStandardMaterial color="white" />
        </mesh>
    )
}

function BoxBasic() {
    const boxRef = useRef();
    useFrame((state, delta) => {
        boxRef.current.rotation.y += delta;
    });
    return (
        <mesh ref={boxRef} position={[3, 0.5, 5]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            {/* meshBasicMaterial: ignores lighting, always bright, fast performance */}
            {/* Limitation: no lighting effects (shadows visible but material unaffected) */}
            <meshBasicMaterial color="white" />
        </mesh>
    )
}

function BoxPhysical() {
    const boxRef = useRef();
    useFrame((state, delta) => {
        boxRef.current.rotation.y += delta;
    });
    return (
        <mesh ref={boxRef} position={[5, 0.5, 2]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            {/* meshPhysicalMaterial: advanced realistic material with extra parameters */}
            {/* Properties: metalness, roughness, ior (index of refraction) for glass/water effects */}
            {/* Limitation: slower performance than Standard material due to physics calculations */}
            <meshPhysicalMaterial color="white" />
        </mesh>
    )
}

function BoxToon() {
    const boxRef = useRef();
    useFrame((state, delta) => {
        boxRef.current.rotation.y += delta;
    });
    return (
        <mesh ref={boxRef} position={[5, 0.5, -1]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            {/* meshToonMaterial: cartoon/cel-shading style with flat colors and bold outlines */}
            {/* Limitation: RectAreaLight doesn't work with Toon material (incompatible) */}
            {/* Good for: stylized games, comic-book visuals, non-photorealistic rendering */}
            <meshToonMaterial color="white" />
        </mesh>
    )
}

function Sphere() {
    return (
        <mesh position={[-6, 0.5, 7]} castShadow>
            {/* sphereGeometry args: [radius, widthSegments, heightSegments] */}
            {/* Higher segments = smoother sphere but more vertices = slower performance */}
            {/* 32x32 is good balance between smoothness and performance */}
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="yellow" />
        </mesh>
    )
}

function SphereBasic() {
    return (
        <mesh position={[-3, 0.5, 7]} castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color="yellow" />
        </mesh>
    )
}

function SpherePhysical() {
    return (
        <mesh position={[-6, 0.5, 4]} castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhysicalMaterial color="yellow" />
        </mesh>
    )
}

function SphereToon() {
    return (
        <mesh position={[-3, 0.5, 4]} castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshToonMaterial color="yellow" />
        </mesh>
    )
}

export default function LightsAndShadowsMaterials() {
    return (
        <div className="w-full h-screen bg-black">
            {/* Canvas: 3D rendering container */}
            {/* shadows: enables shadow rendering (performance cost) */}
            <Canvas camera={{ position: [4, 4, 6], fov: 50 }} shadows>
                {/* ambientLight: uniform base lighting from all directions */}
                {/* No shadows from ambient light (fills dark areas) */}
                <ambientLight intensity={1} />
                <Plane />
                <Box />
                <BoxBasic />
                <BoxPhysical />
                <BoxToon />
                <Sphere />
                <SphereBasic />
                <SphereToon />
                <SpherePhysical />
                <DirectionalLight />
                <PointLight />
                <SpotLight />
                <HemisphereLight />
                <RectAreaLight />
                <OrbitControls />
            </Canvas>
        </div>
    )
}
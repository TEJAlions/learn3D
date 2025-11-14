
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

const colors = ['green', 'red', 'blue', 'white', 'pink', 'yellow', 'purple', 'orange', 'cyan', 'magenta'];

function Cube({ position, initialColor }) {
    const [color, setColor] = useState(initialColor);
    const cubeRef = useRef();
    useFrame((state, delta) => {
        cubeRef.current.position.y = Math.sin(state.clock.elapsedTime); // to move the position of cube in a sine wave pattern in y axis
        cubeRef.current.position.x = Math.cos(state.clock.elapsedTime); // to move the position of cube in a cosine wave pattern in x axis
        // in totla this combination will move cube in a circular path in anticlockwise direction
        cubeRef.current.rotation.z -= delta * 0.5; // to rotate the cube around z axis in clockwise direction
        // console.log(delta*1000)
        const time = Math.sin(state.clock.elapsedTime / 8);
        cubeRef.current.scale.set(time, time, time); // to scale the cube up and down based on sine wave

    });

    return (
        <mesh 
        onPointerOver={(e) => setColor(colors[Math.floor(Math.random() * colors.length)])} // to change color on hover
        ref={cubeRef} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )

}


export default function PositonChange() {
    return (

        <div className="w-full h-screen bg-black">
            {/* scene and camera */}
            <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>

                {/* Lights */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} />

                {/* Mesh or object */}
                <Cube position={[0, 0, 0]} initialColor='green' />

            </Canvas>
        </div>
    );
};
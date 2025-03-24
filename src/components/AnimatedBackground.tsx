// components/AnimatedBackground.tsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const SpinningBox = ({ position, color }: any) => {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.002;
            meshRef.current.rotation.y += 0.003;
        }
    });

    return (
        <mesh position={position} ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

const AnimatedBackground = () => {
    return (
        <div style={{ width: "100vw", height: "100vh", position: "fixed", zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <SpinningBox position={[-2, 0, 0]} color="hotpink" />
                <SpinningBox position={[2, 0, 0]} color="lightblue" />
                <SpinningBox position={[0, 2, 0]} color="yellow" />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
};

export default AnimatedBackground;

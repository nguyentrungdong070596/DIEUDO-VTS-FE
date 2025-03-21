import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";

type BubbleProps = {
    position: [number, number, number];
    onExplode: () => void;
    size?: number;
};

const Bubble: React.FC<BubbleProps> = ({ position, onExplode, size = 0.2 }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [y, setY] = useState(position[1]);
    const [x, setX] = useState(position[0]);
    const [scale, setScale] = useState(1.2);
    const [opacity, setOpacity] = useState(0.6);
    const [exploding, setExploding] = useState(false);

    const { animatedScale } = useSpring({
        animatedScale: scale,
        config: { tension: 180, friction: 12 },
    });

    useFrame(() => {
        if (!exploding) {
            setY((prev) => prev + 0.012);
            setX((prev) => prev + Math.sin(prev * 3) * 0.001);
            meshRef.current.position.set(x, y, position[2]);

            if (y > 3.5) {
                setExploding(true);
            }
        } else {
            setScale((s) => Math.max(s - 0.05, 0));
            setOpacity((o) => Math.max(o - 0.05, 0));
            if (scale <= 0.05) onExplode();
        }
    });

    const handlePointerOver = () => {
        if (!exploding) {
            setExploding(true);
            // popSound.play(); // optional
        }
    };

    const randomColor = () => {
        const h = Math.floor(Math.random() * 30) + 170;
        return new THREE.Color(`hsl(${h}, 100%, 90%)`);
    };

    return (
        <a.mesh
            ref={meshRef}
            scale={animatedScale.to((s) => [s, s, s])}
            position={[x, y, position[2]]}
            onPointerOver={handlePointerOver}
        >
            <sphereGeometry args={[size, 32, 32]} />
            <meshPhysicalMaterial
                transparent
                transmission={1}
                thickness={0.8}
                roughness={0.05}
                reflectivity={0.5}
                clearcoat={1}
                clearcoatRoughness={0.05}
                iridescence={0.9}
                iridescenceIOR={1.2}
                sheen={1}
                metalness={0.2}
                specularIntensity={0.6}
                color={randomColor()}
                opacity={opacity}
            />
        </a.mesh>
    );
};

const BubbleBackground: React.FC = () => {
    const [bubbles, setBubbles] = useState<any[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const createBubble = () => {
        const x = Math.random() * 10 - 5;     // rộng ra để tránh vón cục
        const z = Math.random() * 10 - 5;

        const size = 0.2 + Math.random() * 0.25; // Kích thước nhỏ hơn, giới hạn từ 0.2 → 0.45
        setBubbles((prev) => [
            ...prev,
            { id: Date.now() + Math.random(), position: [x, -3, z], size },
        ]);
    };

    useEffect(() => {
        const startInterval = () => {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(createBubble, 800); // 1.5s tạo 1 bubble
            }
        };

        const stopInterval = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                startInterval();
            } else {
                stopInterval();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Khởi tạo ban đầu nếu tab đang active
        if (document.visibilityState === "visible") {
            startInterval();
        }

        return () => {
            stopInterval();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const removeBubble = (id: number) => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
    };

    return (
        <div style={{ position: "fixed", width: "100vw", height: "100vh", zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 55, aspect: window.innerWidth / window.innerHeight }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[5, 5, 5]} />
                <EffectComposer>
                    <Bloom intensity={0.6} luminanceThreshold={0.2} />
                </EffectComposer>
                <OrbitControls enableZoom={false} enableRotate={false} />
                {bubbles.map((bubble) => (
                    <Bubble
                        key={bubble.id}
                        position={bubble.position}
                        size={bubble.size}
                        onExplode={() => removeBubble(bubble.id)}
                    />
                ))}
            </Canvas>
        </div>
    );
};

export default BubbleBackground;

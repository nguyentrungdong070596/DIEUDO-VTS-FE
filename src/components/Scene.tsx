import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Astronaut from './Astronaut';

const Scene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const astronautRef = useRef<THREE.Group | null>(null);

    useEffect(() => {
        // Thiết lập scene, camera, renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true để nền trong suốt
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Ánh sáng
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);

        // Thêm phi hành gia
        const astronaut = Astronaut({ scene });
        astronautRef.current = astronaut;
        astronaut.position.y = 10; // Bắt đầu từ trên cao

        // Đặt camera
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (astronautRef.current) {
                astronautRef.current.rotation.y += 0.01; // Xoay phi hành gia
            }
            renderer.render(scene, camera);
        };
        animate();

        // Xử lý cuộn
        const handleScroll = () => {
            if (astronautRef.current) {
                const scrollY = window.scrollY;
                // Di chuyển phi hành gia xuống dựa trên scroll
                astronautRef.current.position.y = 10 - scrollY * 0.02;
                // Giới hạn dưới
                if (astronautRef.current.position.y < -5) {
                    astronautRef.current.position.y = -5;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);

        // Xử lý resize cửa sổ
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Dọn dẹp
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                height: '100vh',
                width: '100vw',
                position: 'fixed', // Giữ cố định trên màn hình
                top: 0,
                left: 0,
                zIndex: 10000000, // Đặt trên tất cả nội dung
            }}
        />
    );
};

export default Scene;
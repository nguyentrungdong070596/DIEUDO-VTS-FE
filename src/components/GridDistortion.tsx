import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}
`;

interface GridDistortionProps {
    grid?: number;
    mouse?: number;
    strength?: number;
    relaxation?: number;
    imageSrc: string;
    className?: string;
}

const GridDistortion = ({
    grid = 15,
    mouse = 0.1,
    strength = 0.15,
    relaxation = 0.9,
    imageSrc,
    className = ''
}: GridDistortionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageAspectRef = useRef(1);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const dataTextureRef = useRef<THREE.DataTexture | null>(null);
    const planeRef = useRef<THREE.Mesh | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const uniformsRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
        camera.position.z = 2;
        cameraRef.current = camera;

        const uniforms = {
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            uTexture: { value: null as THREE.Texture | null },
            uDataTexture: { value: null as THREE.DataTexture | null },
        };
        uniformsRef.current = uniforms;

        const size = grid;
        const data = new Float32Array(4 * size * size);
        for (let i = 0; i < size * size; i++) {
            data[i * 4] = Math.random() * 255 - 125;
            data[i * 4 + 1] = Math.random() * 255 - 125;
        }

        const dataTexture = new THREE.DataTexture(
            data,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        dataTexture.needsUpdate = true;
        uniforms.uDataTexture.value = dataTexture;
        dataTextureRef.current = dataTexture;

        const material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms,
            vertexShader,
            fragmentShader,
        });

        const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
        const plane = new THREE.Mesh(geometry, material);
        planeRef.current = plane;
        scene.add(plane);

        const mouseState = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };

        const handleResize = () => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            const containerAspect = width / height;
            const imageAspect = imageAspectRef.current;

            renderer.setSize(width, height);
            const scale = Math.max(containerAspect / imageAspect, 1);
            plane.scale.set(imageAspect * scale, scale, 1);

            const frustumHeight = 1;
            const frustumWidth = frustumHeight * containerAspect;
            camera.left = -frustumWidth / 2;
            camera.right = frustumWidth / 2;
            camera.top = frustumHeight / 2;
            camera.bottom = -frustumHeight / 2;
            camera.updateProjectionMatrix();

            uniforms.resolution.value.set(width, height, 1, 1);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1 - (e.clientY - rect.top) / rect.height;
            mouseState.vX = x - mouseState.prevX;
            mouseState.vY = y - mouseState.prevY;
            Object.assign(mouseState, { x, y, prevX: x, prevY: y });
        };

        const handleMouseLeave = () => {
            dataTexture.needsUpdate = true;
            Object.assign(mouseState, { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);
        handleResize();

        const animate = () => {
            requestAnimationFrame(animate);
            uniforms.time.value += 0.05;

            const data = dataTexture.image.data as Float32Array;
            for (let i = 0; i < size * size; i++) {
                data[i * 4] *= relaxation;
                data[i * 4 + 1] *= relaxation;
            }

            const gridMouseX = size * mouseState.x;
            const gridMouseY = size * mouseState.y;
            const maxDist = size * mouse;

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const distance = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
                    if (distance < maxDist * maxDist) {
                        const index = 4 * (i + size * j);
                        const power = Math.min(maxDist / Math.sqrt(distance), 10);
                        data[index] += strength * 100 * mouseState.vX * power;
                        data[index + 1] -= strength * 100 * mouseState.vY * power;
                    }
                }
            }

            dataTexture.needsUpdate = true;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            dataTexture.dispose();
            if (uniforms.uTexture.value) (uniforms.uTexture.value as THREE.Texture).dispose();
        };
    }, [grid, mouse, strength, relaxation]);

    useEffect(() => {
        if (!imageSrc || !uniformsRef.current || !planeRef.current) return;

        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin('anonymous');
        textureLoader.load(imageSrc, (texture) => {
            texture.minFilter = THREE.LinearFilter;
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.needsUpdate = true;

            // Update uniforms
            uniformsRef.current.uTexture.value = texture;

            // Update image aspect ratio and plane scale
            const imageAspect = texture.image.width / texture.image.height;
            imageAspectRef.current = imageAspect;

            if (containerRef.current && cameraRef.current && planeRef.current && rendererRef.current) {
                const container = containerRef.current;
                const width = container.offsetWidth;
                const height = container.offsetHeight;
                const containerAspect = width / height;

                const scale = Math.max(containerAspect / imageAspect, 1);
                planeRef.current.scale.set(imageAspect * scale, scale, 1);

                const frustumHeight = 1;
                const frustumWidth = frustumHeight * containerAspect;
                cameraRef.current.left = -frustumWidth / 2;
                cameraRef.current.right = frustumWidth / 2;
                cameraRef.current.top = frustumHeight / 2;
                cameraRef.current.bottom = -frustumHeight / 2;
                cameraRef.current.updateProjectionMatrix();

                uniformsRef.current.resolution.value.set(width, height, 1, 1);

                // 🔥 Trigger render again in case it was skipped
                rendererRef.current.render(planeRef.current.parent!, cameraRef.current);
            }
        });
    }, [imageSrc]);

    return <div ref={containerRef} className={`w-full h-full overflow-hidden ${className}`} />;
};

export default GridDistortion;

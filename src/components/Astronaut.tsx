import * as THREE from 'three';

interface AstronautProps {
    scene: THREE.Scene;
}

const Astronaut = ({ scene }: AstronautProps): THREE.Group => {
    const astronaut = new THREE.Group();

    // Đầu (hình cầu)
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    astronaut.add(head);

    // Thân (hình hộp)
    const bodyGeometry = new THREE.BoxGeometry(0.8, 1, 0.4);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    astronaut.add(body);

    // Tay trái (hình trụ)
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 32);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0.5, 0);
    leftArm.rotation.z = Math.PI / 4;
    astronaut.add(leftArm);

    // Tay phải (hình trụ)
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.6, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 4;
    astronaut.add(rightArm);

    // Chân trái (hình trụ)
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.25, 0, 0);
    astronaut.add(leftLeg);

    // Chân phải (hình trụ)
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.25, 0, 0);
    astronaut.add(rightLeg);

    scene.add(astronaut);
    return astronaut;
};

export default Astronaut;
import * as THREE from 'three'; // <--- Важно: импорт Three.js

function map(value, x1, y1, x2, y2) {
    return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}

function createEightShapeGeometry(radius) {
    const shape = new THREE.Shape();
    const numPoints = 50;
    for (let i = 0; i <= numPoints; i++) {
        let t = map(i, 0, numPoints, 0, Math.PI * 2);
        let x = radius * Math.cos(2 * t) * (0.5 + 0.3 * Math.cos(t));
        let y = radius * Math.sin(t) * (0.8 + 0.2 * Math.sin(t));

        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    return new THREE.ShapeGeometry(shape);
}

function createEightMesh(radius) {
    const geometry = createEightShapeGeometry(radius);
    const material = new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#three-canvas'); // Получаем canvas
const renderer = new THREE.WebGLRenderer({ canvas }); // Привязываем рендерер к canvas
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
camera.position.z = 5;

const numEight = 12;
const eightShapes = [];

for (let i = 0; i < numEight; i++) {
    for (let j = 0; j < numEight; j++) {
        const radius = Math.random() * 0.5 + 0.2;
        const mesh = createEightMesh(radius);
        mesh.position.set(
            (i - numEight / 2 + 0.5) * 1,
            (j - numEight / 2 + 0.5) * 1,
            0
        );
        mesh.phase = Math.random() * Math.PI * 2;
        scene.add(mesh);
        eightShapes.push(mesh);
    }
}

function animate() {
    requestAnimationFrame(animate);

    eightShapes.forEach(mesh => {
        mesh.phase += 0.05;
        const pulse = map(Math.sin(mesh.phase), -1, 1, 0.7, 1.3);
        mesh.scale.set(pulse, pulse, pulse);
    });

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    render();
});

function render(){
    renderer.render(scene, camera)
}

animate();
/**
 * EROSSARC Three.js 3D Background Scene (Candlestick Matrix & Particles)
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Add Ambient & Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFF6B00, 2, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create Floating Candlesticks & Geometric Grid
    const candlesGroup = new THREE.Group();
    scene.add(candlesGroup);

    const candleGeometry = new THREE.BoxGeometry(0.6, 2.5, 0.6);
    const wickGeometry = new THREE.BoxGeometry(0.1, 4.5, 0.1);

    const materials = [
        new THREE.MeshPhysicalMaterial({ color: 0x00FF88, transparent: true, opacity: 0.6, roughness: 0.2, metalness: 0.8, transmission: 0.5 }),
        new THREE.MeshPhysicalMaterial({ color: 0xFF4D4D, transparent: true, opacity: 0.6, roughness: 0.2, metalness: 0.8, transmission: 0.5 }),
        new THREE.MeshPhysicalMaterial({ color: 0xFF6B00, transparent: true, opacity: 0.4, roughness: 0.1, metalness: 0.9, transmission: 0.6 })
    ];

    const candlesCount = 35;
    const candlesData = [];

    for (let i = 0; i < candlesCount; i++) {
        const mat = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(candleGeometry, mat);
        const wick = new THREE.Mesh(wickGeometry, mat);

        const group = new THREE.Group();
        group.add(mesh);
        group.add(wick);

        group.position.x = (Math.random() - 0.5) * 40;
        group.position.y = (Math.random() - 0.5) * 25;
        group.position.z = (Math.random() - 0.5) * 20 - 5;

        candlesGroup.add(group);
        candlesData.push({
            mesh: group,
            rotSpeed: (Math.random() - 0.5) * 0.01,
            floatSpeed: Math.random() * 0.02 + 0.01,
            initialY: group.position.y
        });
    }

    // Mouse Interaction Parallax Offset
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        camera.position.x = targetX * 5;
        camera.position.y = -targetY * 5;
        camera.lookAt(scene.position);

        candlesData.forEach((item, index) => {
            item.mesh.rotation.y += item.rotSpeed;
            item.mesh.position.y = item.initialY + Math.sin(elapsedTime * item.floatSpeed + index) * 1.5;
        });

        renderer.render(scene, camera);
    }

    animate();
});

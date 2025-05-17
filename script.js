let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
let inertia = { x: 0, y: 0 };
const friction = 0.95;
const minVelocity = 0.008; // Minimum movement
// Lower = longer spin

window.onload = function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(600, 600);
    document.getElementById('earth3d').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const texture = new THREE.TextureLoader().load('earth.jpg');
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    scene.add(new THREE.AmbientLight(0x333333));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    camera.position.z = 6;

    renderer.domElement.addEventListener('mousedown', function(e) {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        velocity = { x: 0, y: 0 };
    });

    renderer.domElement.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            earth.rotation.y += deltaMove.x * 0.01;
            earth.rotation.x += deltaMove.y * 0.01;
            velocity = { x: deltaMove.x * 0.01, y: deltaMove.y * 0.01 };
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    renderer.domElement.addEventListener('mouseup', function() {
        isDragging = false;
        inertia = { ...velocity };
    });

    renderer.domElement.addEventListener('mouseleave', function() {
        isDragging = false;
        inertia = { ...velocity };
    });

    function animate() {
        requestAnimationFrame(animate);
        if (!isDragging) {
            earth.rotation.y += inertia.x;
            earth.rotation.x += inertia.y;
            inertia.x *= friction;
            inertia.y *= friction;

            // Enforce minimum movement
            if (Math.abs(inertia.x) < minVelocity && inertia.x !== 0) {
                inertia.x = minVelocity * Math.sign(inertia.x);
            }
            if (Math.abs(inertia.y) < minVelocity && inertia.y !== 0) {
                inertia.y = minVelocity * Math.sign(inertia.y);
            }
        }
        renderer.render(scene, camera);
    }
    animate();
}
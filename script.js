    window.onload = function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300);
    document.getElementById('earth3d').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    // Use your custom image here
    const texture = new THREE.TextureLoader().load('earth.jpg');
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add ambient and directional light for 3D effect
    scene.add(new THREE.AmbientLight(0x333333));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    camera.position.z = 3;

    function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.01;
    renderer.render(scene, camera);
}
    animate();
}

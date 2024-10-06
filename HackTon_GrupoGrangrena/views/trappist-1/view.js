// Escenario, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear la estrella (Trappist-1)
const starGeometry = new THREE.SphereGeometry(1, 32, 32);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const star = new THREE.Mesh(starGeometry, starMaterial);
scene.add(star);

// Crear los planetas
const planets = [];
const planetData = [
    { name: "Trappist-1b", distance: 3, color: 0x87CEEB, radius: 0.2 },
    { name: "Trappist-1c", distance: 4, color: 0x4682B4, radius: 0.25 },
    { name: "Trappist-1d", distance: 5, color: 0x4169E1, radius: 0.3 },
    { name: "Trappist-1e", distance: 6, color: 0x0000FF, radius: 0.35 },
    { name: "Trappist-1f", distance: 7, color: 0x1E90FF, radius: 0.4 },
    { name: "Trappist-1g", distance: 8, color: 0x00BFFF, radius: 0.45 },
    { name: "Trappist-1h", distance: 9, color: 0xADD8E6, radius: 0.5 }
];

// Crear geometría y material para los planetas
planetData.forEach((planetInfo, index) => {
    const planetGeometry = new THREE.SphereGeometry(planetInfo.radius, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: planetInfo.color });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    planet.position.x = planetInfo.distance; // Posicionar el planeta en su distancia
    planet.userData = {
        name: planetInfo.name,
        distance: planetInfo.distance,
        info: `Distance to star: ${planetInfo.distance} AU`
    };

    planets.push(planet);
    scene.add(planet);
});

// Posicionar la cámara
camera.position.z = 15;

// Añadir interacción al hacer clic en los planetas
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const planetInfoDiv = document.getElementById('planetInfo');

// Detectar clic en los planetas
function onMouseClick(event) {
    // Convertir la posición del mouse en coordenadas normalizadas para Three.js
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
        const planet = intersects[0].object;
        planetInfoDiv.textContent = planet.userData.info; // Mostrar la info del planeta
    }
}

// Cambiar de página al hacer doble clic
function onDoubleClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
        window.location.href = "nextPage.html"; // Cambia "nextPage.html" a la página que quieras
    }
}

window.addEventListener('click', onMouseClick);
window.addEventListener('dblclick', onDoubleClick);

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Hacer que los planetas giren alrededor de la estrella
    planets.forEach((planet, index) => {
        planet.position.x = Math.cos(Date.now() * 0.001 + index) * planetData[index].distance;
        planet.position.z = Math.sin(Date.now() * 0.001 + index) * planetData[index].distance;
    });

    renderer.render(scene, camera);
}

animate();

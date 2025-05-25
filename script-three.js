const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.insertBefore(renderer.domElement, document.body.firstChild);
renderer.domElement.id = "star-canvas";
const starsGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const positions = [];

for (let i = 0; i < starCount; i++) {
  positions.push((Math.random() - 0.5) * 1000);
  positions.push((Math.random() - 0.5) * 1000);
  positions.push(-Math.random() * 1000);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
const starField = new THREE.Points(starsGeometry, starMaterial);
scene.add(starField);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

document.addEventListener('mousemove', (e) => {
  camera.position.x = (e.clientX / window.innerWidth - 0.5) * 2;
  camera.position.y = -(e.clientY / window.innerHeight - 0.5) * 2;
});
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Load GLTF/GLB model
const loader = new GLTFLoader();
let model;
loader.load(
  './model.glb', // Path to your model
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.z = 5;

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.01; // Rotate model for effect
  }
  renderer.render(scene, camera);
}

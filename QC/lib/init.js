import * as THREE from "../threejs/build/three.module.js";
import { OrbitControls } from "../threejs/examples/jsm/controls/OrbitControls.js";
import {
  createSkyboxGeometry,
  fontLoad,
  gltfLoad,
  lightInit,
  objectsInit,
} from "./sceneObjects.js";

export let scene,
  camera1,
  camera2,
  selectedCamera,
  renderer,
  raycaster,
  controls;

const cameraInit = () => {
  camera1 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera1.position.set(0, 0, 7.5);
  camera1.lookAt(0, 0, 0);
  camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera2.position.set(0, 0, 0.2);
  camera2.lookAt(0, 0, 5);
  selectedCamera = camera1;
};

const rendererInit = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
};

export const init = () => {
  scene = new THREE.Scene();
  createSkyboxGeometry(scene);
  cameraInit();
  rendererInit();
  objectsInit(scene);
  lightInit(scene);

  document.body.appendChild(renderer.domElement);
  controls = new OrbitControls(camera1, renderer.domElement);
  fontLoad(scene);
  gltfLoad(scene);
  raycaster = new THREE.Raycaster();
};

window.addEventListener("keypress", (e) => {
  if (e.key.charCodeAt(0) === 32) {
    if (selectedCamera === camera1) {
      selectedCamera = camera2;
      controls.enabled = false;
    } else if (selectedCamera === camera2) {
      selectedCamera = camera1;
      controls.enabled = true;
    }
  }
});

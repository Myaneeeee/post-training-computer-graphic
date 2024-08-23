import * as THREE from "./threejs/build/three.module.js";
import { render } from "./lib/render.js";
import { camera1, camera2, renderer, init, raycaster } from "./lib/init.js";
import {
  lightSwitch1,
  lightSwitch2,
  lightSwitch3,
  toggleDiscoLight,
  toggleSmallLight,
  toggleTableLight,
} from "./lib/sceneObjects.js";

let mouse = new THREE.Vector2();

window.onload = () => {
  init();
  render();
};

window.onresize = () => {
  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();

  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera1);

  const intersects = raycaster.intersectObjects(
    [lightSwitch1, lightSwitch2, lightSwitch3].filter(Boolean),
    true
  );

  if (intersects.length > 0) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "default";
  }
});

window.addEventListener("click", (e) => {
  const pointer = new THREE.Vector2();
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera1);

  const intersects = raycaster.intersectObjects(
    [lightSwitch1, lightSwitch2, lightSwitch3].filter(Boolean),
    true
  );

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;

    // console.log("Clicked Object switchId:", clickedObject.userData.switchId);

    if (clickedObject.userData.switchId === "lightSwitch1") {
      toggleTableLight();
    } else if (clickedObject.userData.switchId === "lightSwitch2") {
      toggleDiscoLight();
    } else if (clickedObject.userData.switchId === "lightSwitch3") {
      toggleSmallLight();
    }
  }
});

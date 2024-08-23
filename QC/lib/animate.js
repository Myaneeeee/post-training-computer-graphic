import * as THREE from "../threejs/build/three.module.js";
import { camera2, pointerLockControls } from "./init.js";
import {
  hourHand,
  minuteHand,
  secondHand,
  discoBall,
  discoLights,
  textMesh,
  person,
} from "./sceneObjects.js";

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const onKeyDown = function (event) {
  switch (event.code) {
    case "KeyW":
      moveForward = true;
      break;
    case "KeyS":
      moveBackward = true;
      break;
    case "KeyA":
      moveLeft = true;
      break;
    case "KeyD":
      moveRight = true;
      break;
  }
};

const onKeyUp = function (event) {
  switch (event.code) {
    case "KeyW":
      moveForward = false;
      break;
    case "KeyS":
      moveBackward = false;
      break;
    case "KeyA":
      moveLeft = false;
      break;
    case "KeyD":
      moveRight = false;
      break;
  }
};

document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);

export const animate = () => {
  const delta = 0.1;
  let direction = new THREE.Vector3();
  let moveDirection = new THREE.Vector3();

  if (pointerLockControls.isLocked) {
    // Get the forward direction relative to the camera's orientation
    camera2.getWorldDirection(direction);

    // Update movement direction based on key input
    if (moveForward) moveDirection.add(direction);
    if (moveBackward) moveDirection.sub(direction);

    // Calculate the right direction relative to the camera
    direction.cross(camera2.up).normalize();

    if (moveLeft) moveDirection.sub(direction);
    if (moveRight) moveDirection.add(direction);

    // Normalize movement direction and apply it to the person model
    moveDirection.normalize().multiplyScalar(delta);
    person.position.add(moveDirection);

    // Rotate the person to face the movement direction
    if (moveDirection.length() > 0) {
      person.lookAt(person.position.clone().add(moveDirection));
      person.rotation.x = 0; // Ensure there's no tilting
      person.rotation.z = 0; // Ensure there's no rolling
    }

    // Keep the camera in sync with the person's position
    camera2.position.set(
      person.position.x,
      person.position.y + 3,
      person.position.z
    );

    // Apply boundaries to camera and person model
    const halfWidth = 5;
    const halfHeight = 2.5;

    person.position.x = Math.max(
      -halfWidth,
      Math.min(halfWidth, person.position.x)
    );
    person.position.z = Math.max(
      -halfWidth,
      Math.min(halfWidth, person.position.z)
    );
    camera2.position.x = person.position.x;
    camera2.position.z = person.position.z;

    camera2.position.y = Math.max(
      -halfHeight,
      Math.min(halfHeight, camera2.position.y)
    );
    person.position.y = -2.5; // Keep the person at ground level (Y-axis)
  }

  // Existing animation logic for other objects...
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondAngle = (seconds / 60) * Math.PI * 2;
  const minuteAngle = (minutes / 60) * Math.PI * 2 + secondAngle / 60;
  const hourAngle = ((hours % 12) / 12) * Math.PI * 2 + minuteAngle / 12;

  secondHand.rotation.z = -secondAngle;
  minuteHand.rotation.z = -minuteAngle;
  hourHand.rotation.z = -hourAngle;

  if (discoBall) {
    discoBall.rotation.y += 0.01;
  }

  if (discoLights) {
    discoLights.forEach((light, index) => {
      const angle = 0.01 * index + now.getTime() * 0.0005;
      light.position.x = Math.cos(angle) * 3;
      light.position.z = Math.sin(angle) * 3;
    });
  }

  const time = Date.now() * 0.001;
  discoLights.forEach((light, index) => {
    const hue = (time + index * 0.1) % 1;
    light.color.setHSL(hue, 0.55, 0.5);
  });

  if (textMesh) {
    const hue = time % 100;
    textMesh.material.color.setHSL(hue, 1.0, 0.5);
  }
};

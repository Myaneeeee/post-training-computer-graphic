import * as THREE from "../threejs/build/three.module.js";
import { GLTFLoader } from "../threejs/examples/jsm/loaders/GLTFLoader.js";
import {
  createAmbientLight,
  createCylinder,
  createLine,
  createPointLight,
  createDiscoBall,
  createDiscoLight,
  createPlane,
  createTableLight,
  createPoster,
} from "./createObjects.js";
import { FontLoader } from "../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../threejs/examples/jsm/geometries/TextGeometry.js";

export let hourHand, minuteHand, secondHand;
export let discoBall;
export let discoLights = [];
export let textMesh;
export let tableLight, lightSwitch1;
export let discoLight, lightSwitch2;
export let pointLight1, pointLight2, pointLight3, pointLight4, lightSwitch3;
export let person;

export const createSkyboxGeometry = (scene) => {
  const textureLoader = new THREE.TextureLoader();

  const rightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textureLoader.load("../public/assets/images/side.avif"),
    side: THREE.BackSide,
  });

  const leftMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textureLoader.load("../public/assets/images/side.avif"),
    side: THREE.BackSide,
  });

  const topMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textureLoader.load("../public/assets/images/side.avif"),
    side: THREE.BackSide,
  });

  const bottomTexture = textureLoader.load(
    "../public/assets/images/bottom.jpg"
  );
  bottomTexture.wrapS = THREE.RepeatWrapping;
  bottomTexture.wrapT = THREE.RepeatWrapping;
  bottomTexture.repeat.set(2, 1);

  const bottomMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: bottomTexture,
    side: THREE.BackSide,
  });

  const frontMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textureLoader.load("../public/assets/images/side.avif"),
    side: THREE.BackSide,
  });

  const backMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: textureLoader.load("../public/assets/images/side.avif"),
    side: THREE.BackSide,
  });

  const skyboxGeometry = new THREE.BoxGeometry(10, 5, 10);
  const skyboxMesh = new THREE.Mesh(skyboxGeometry, [
    rightMat,
    leftMat,
    topMat,
    bottomMat,
    frontMat,
    backMat,
  ]);
  skyboxMesh.castShadow = true;
  skyboxMesh.receiveShadow = true;

  scene.add(skyboxMesh);
};

export const gltfLoad = (scene) => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    "../public/assets/models/double-bed/source/Double-bed.gltf",
    (gltf) => {
      const doubleBed = gltf.scene;
      doubleBed.position.set(0, -2.5, -3.6);
      doubleBed.receiveShadow = true;
      doubleBed.castShadow = true;
      scene.add(doubleBed);
    }
  );

  gltfLoader.load("../public/assets/models/window/scene.gltf", (gltf) => {
    const window = gltf.scene;
    window.position.set(-5.63, -1.75, 2.3);
    window.scale.set(0.035, 0.035, 0.035);
    window.receiveShadow = true;
    window.castShadow = true;
    scene.add(window);
  });

  gltfLoader.load("../public/assets/models/window/scene.gltf", (gltf) => {
    const window = gltf.scene;
    window.position.set(-5.63, -1.75, -2.3);
    window.scale.set(0.035, 0.035, 0.035);
    window.receiveShadow = true;
    window.castShadow = true;
    scene.add(window);
  });

  gltfLoader.load("../public/assets/models/door/scene.gltf", (gltf) => {
    const door = gltf.scene;
    door.position.set(5, -0.755, 2.5);
    door.scale.set(0.015, 0.015, 0.015);
    door.receiveShadow = true;
    door.castShadow = true;
    scene.add(door);
  });

  gltfLoader.load(
    "../public/assets/models/bed_side_table_with_lamp/scene.gltf",
    (gltf) => {
      const tableLamp = gltf.scene;
      tableLamp.position.set(-1.9, -1.65, -4.6);
      tableLamp.scale.set(0.02, 0.02, 0.02);
      tableLamp.receiveShadow = true;
      tableLamp.castShadow = true;
      scene.add(tableLamp);
    }
  );

  gltfLoader.load("../public/assets/models/light_switch/scene.gltf", (gltf) => {
    lightSwitch1 = gltf.scene;
    lightSwitch1.position.set(-2.65, -1.3, -4.9);
    lightSwitch1.scale.set(3, 3, 3);
    lightSwitch1.receiveShadow = true;
    lightSwitch1.castShadow = true;
    lightSwitch1.rotation.y = -Math.PI / 2;
    lightSwitch1.traverse((child) => {
      if (child.isMesh) {
        child.userData.switchId = "lightSwitch1";
      }
    });
    scene.add(lightSwitch1);
  });

  gltfLoader.load("../public/assets/models/light_switch/scene.gltf", (gltf) => {
    lightSwitch2 = gltf.scene;
    lightSwitch2.position.set(2, 0, -4.9);
    lightSwitch2.scale.set(3, 3, 3);
    lightSwitch2.receiveShadow = true;
    lightSwitch2.castShadow = true;
    lightSwitch2.rotation.y = -Math.PI / 2;
    lightSwitch2.traverse((child) => {
      if (child.isMesh) {
        child.userData.switchId = "lightSwitch2";
      }
    });
    scene.add(lightSwitch2);
  });

  gltfLoader.load("../public/assets/models/light_switch/scene.gltf", (gltf) => {
    lightSwitch3 = gltf.scene;
    lightSwitch3.position.set(3.5, 0, -4.9);
    lightSwitch3.scale.set(3, 3, 3);
    lightSwitch3.receiveShadow = true;
    lightSwitch3.castShadow = true;
    lightSwitch3.rotation.y = -Math.PI / 2;
    lightSwitch3.traverse((child) => {
      if (child.isMesh) {
        child.userData.switchId = "lightSwitch3";
      }
    });
    scene.add(lightSwitch3);
  });

  gltfLoader.load("../public/assets/models/person/scene.gltf", (gltf) => {
    person = gltf.scene;
    person.position.set(0, -2.5, 0);
    person.scale.set(0.015, 0.015, 0.015);
    person.receiveShadow = true;
    person.castShadow = true;
    scene.add(person);
  });
};

export const fontLoad = (scene) => {
  const fontLoader = new FontLoader();
  fontLoader.load(
    "../public/assets/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const geometry = new TextGeometry("<3 Baek Ji-heon ", {
        font: font,
        size: 0.25,
        height: 0.1,
      });
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      textMesh = new THREE.Mesh(geometry, material);
      textMesh.rotation.y = -Math.PI / 2;
      textMesh.position.set(4.9, 1.75, -2.4);
      scene.add(textMesh);
    }
  );

  fontLoader.load(
    "../public/assets/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const geometry = new TextGeometry("Disco Light", {
        font: font,
        size: 0.15,
        height: 0.1,
      });
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const discoText = new THREE.Mesh(geometry, material);
      discoText.position.set(1.5, 0.5, -4.9);
      scene.add(discoText);
    }
  );

  fontLoader.load(
    "../public/assets/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const geometry = new TextGeometry("Small Light", {
        font: font,
        size: 0.15,
        height: 0.1,
      });
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const smallText = new THREE.Mesh(geometry, material);
      smallText.position.set(3, 0.5, -4.9);
      scene.add(smallText);
    }
  );
};

export const lightInit = (scene) => {
  const ambientLight = createAmbientLight();
  scene.add(ambientLight);

  pointLight1 = createPointLight(scene);
  pointLight1.position.set(3, 2, 3);
  scene.add(pointLight1);

  pointLight2 = createPointLight(scene);
  pointLight2.position.set(-3, 2, 3);
  scene.add(pointLight2);

  pointLight3 = createPointLight(scene);
  pointLight3.position.set(3, 2, -3);
  scene.add(pointLight3);

  pointLight4 = createPointLight(scene);
  pointLight4.position.set(-3, 2, -3);
  scene.add(pointLight4);

  tableLight = createTableLight(scene);
  tableLight.position.set(-1.9, -1, -4.7);
  scene.add(tableLight);
};

export const toggleTableLight = () => {
  if (tableLight.visible) {
    tableLight.visible = false;
  } else {
    tableLight.visible = true;
  }
};

export const toggleDiscoLight = () => {
  discoLights.forEach((light) => {
    light.visible = !light.visible;
  });
};

export const toggleSmallLight = () => {
  if (pointLight1.visible) {
    pointLight1.visible = false;
    pointLight2.visible = false;
    pointLight3.visible = false;
    pointLight4.visible = false;
  } else {
    pointLight1.visible = true;
    pointLight2.visible = true;
    pointLight3.visible = true;
    pointLight4.visible = true;
  }
};

export const objectsInit = (scene) => {
  const clock = createCylinder(0.5, 0.5, 0.1, 24, 0xffffff);
  clock.position.set(0, 1, -4.95);
  clock.receiveShadow = true;
  clock.castShadow = true;
  clock.rotation.x = -Math.PI / 2;

  hourHand = createLine(0, 0, 0, 0, 0.2, 0);
  hourHand.position.set(0, 1, -4.89);

  minuteHand = createLine(0, 0, 0, 0, 0.3, 0);
  minuteHand.position.set(0, 1, -4.89);

  secondHand = createLine(0, 0, 0, 0, 0.35, 0);
  secondHand.position.set(0, 1, -4.89);

  discoBall = createDiscoBall(0.4);
  discoBall.position.set(0, 1.5, 0);
  discoBall.receiveShadow = true;

  const lightDistance = 3;
  const lightCount = 4;

  for (let i = 0; i < lightCount; i++) {
    const angle = (i / lightCount) * Math.PI * 2;
    discoLight = createDiscoLight(scene);
    discoLight.castShadow = true;
    discoLight.receiveShadow = true;
    discoLight.position.set(
      Math.cos(angle) * lightDistance,
      2,
      Math.sin(angle) * lightDistance
    );
    discoLights.push(discoLight);
    scene.add(discoLight);
  }

  const rope = createLine(0, 2.5, 0, 0, 1.5, 0);

  const light1 = createCylinder(0.25, 0.25, 0.1, 24, 0xffa600);
  light1.position.set(3, 2.5, 3);

  const light2 = createCylinder(0.25, 0.25, 0.1, 24, 0xffa600);
  light2.position.set(-3, 2.5, 3);

  const light3 = createCylinder(0.25, 0.25, 0.1, 24, 0xffa600);
  light3.position.set(3, 2.5, -3);

  const light4 = createCylinder(0.25, 0.25, 0.1, 24, 0xffa600);
  light4.position.set(-3, 2.5, -3);

  const plane1 = createPlane(1.5, 2.3);
  plane1.rotation.y = -Math.PI / 2;
  plane1.position.set(-4.95, -0.1, 2.5);

  const plane2 = createPlane(1.5, 2.3);
  plane2.rotation.y = -Math.PI / 2;
  plane2.position.set(-4.95, -0.1, -2.1);

  const poster1 = createPoster(
    1.3,
    2.0,
    "../public/assets/images/poster_1.jpg"
  );
  poster1.position.set(4.9, 0.8, -3.4);
  poster1.rotation.y = Math.PI / 2;

  const poster2 = createPoster(
    1.3,
    2.0,
    "../public/assets/images/poster_2.jpg"
  );
  poster2.position.set(4.9, -0.8, -1.9);
  poster2.rotation.y = Math.PI / 2;

  const poster3 = createPoster(
    1.3,
    2.0,
    "../public/assets/images/poster_3.jpg"
  );
  poster3.position.set(4.9, 0.4, -0.4);
  poster3.rotation.y = Math.PI / 2;

  scene.add(clock);
  scene.add(hourHand);
  scene.add(minuteHand);
  scene.add(secondHand);
  scene.add(discoBall);
  scene.add(rope);
  scene.add(light1);
  scene.add(light2);
  scene.add(light3);
  scene.add(light4);
  scene.add(plane1);
  scene.add(plane2);
  scene.add(poster1);
  scene.add(poster2);
  scene.add(poster3);
};

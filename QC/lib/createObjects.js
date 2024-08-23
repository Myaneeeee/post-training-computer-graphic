import * as THREE from "../threejs/build/three.module.js";

const textureLoader = new THREE.TextureLoader();

export const createLine = (x1, y1, z1, x2, y2, z2) => {
  const points = [new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0x000000, // Black color
  });
  const line = new THREE.Line(geometry, material);
  return line;
};

export const createPlane = (width, height) => {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    map: textureLoader.load("../public/assets/images/sky.avif"),
    side: THREE.BackSide,
  });
  return new THREE.Mesh(geometry, material);
};

export const createPoster = (width, height, path) => {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    map: textureLoader.load(path),
    side: THREE.BackSide,
  });
  return new THREE.Mesh(geometry, material);
};

export const createDiscoBall = (radius) => {
  const geometry = new THREE.SphereGeometry(radius);
  const texture = textureLoader.load(
    "../public/assets/textures/long_white_tiles_ao_4k.jpg"
  );

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.4,
    map: texture,
  });
  return new THREE.Mesh(geometry, material);
};

export const createCylinder = (
  radiusTop,
  radiusButton,
  height,
  segments,
  color
) => {
  const geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusButton,
    height,
    segments
  );
  const material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: 0xffffff,
    emissiveIntensity: 0.4,
  });
  return new THREE.Mesh(geometry, material);
};

export const createAmbientLight = () => {
  const light = new THREE.AmbientLight(0xffffff, 0.5);
  return light;
};

export const createDiscoLight = (scene) => {
  const light = new THREE.PointLight(0xffffff, 0.25, 20);
  const lightHelper = new THREE.PointLightHelper(light, 0.5, 0x000000);
  // scene.add(lightHelper);
  return light;
};

export const createTableLight = (scene) => {
  const light = new THREE.PointLight(0xffa600, 1, 2.5);
  const lightHelper = new THREE.PointLightHelper(light, 0.5, 0x000000);
  // scene.add(lightHelper);
  return light;
};

export const createPointLight = (scene) => {
  const light = new THREE.PointLight(0xffa600, 1, 5);
  const lightHelper = new THREE.PointLightHelper(light, 0.5, 0x000000);
  // scene.add(lightHelper);
  return light;
};

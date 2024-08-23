import {
  hourHand,
  minuteHand,
  secondHand,
  discoBall,
  discoLights,
  textMesh,
} from "./sceneObjects.js";

export const animate = () => {
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

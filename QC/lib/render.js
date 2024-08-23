import { renderer, selectedCamera, controls, scene } from "./init.js";
import { animate } from "./animate.js";

export const render = () => {
  requestAnimationFrame(render);
  renderer.setClearColor(0x3a3a3a);
  controls.update();
  animate();
  renderer.render(scene, selectedCamera);
};

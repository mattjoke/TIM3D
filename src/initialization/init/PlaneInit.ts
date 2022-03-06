import { AmbientLight, PointLight } from 'three';

/**
 * Initializes plane with default ambient and point light color.
 *
 * @return {[AmbientLight, PointLight]}
 */
const planeInit = () => {
  const ambientLight = new AmbientLight('white');
  ambientLight.intensity = 0.3;
  const pointLight = new PointLight('white');
  pointLight.intensity = 0.6;
  pointLight.position.set(150, 150, 105);
  return [ambientLight, pointLight];
};

export { planeInit };

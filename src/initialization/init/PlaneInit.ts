import { AmbientLight, PointLight } from 'three';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @return {{}}
 */
const PlaneInit = () => {
  const light = new AmbientLight('white');
  light.intensity = 0.3;
  const l = new PointLight('white');
  l.intensity = 0.6;
  l.position.set(150, 150, 105);
  return [light, l];
};

export default PlaneInit;

import { PerspectiveCamera, Vector3 } from 'three';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {number} perspective
 * @param {Vector3} defPosition
 * @return {*}
 */
const Camera = (perspective: number, defPosition: Vector3) => {
  const camera = new PerspectiveCamera(75, perspective, 0.1, 5000);

  camera.position.set(defPosition.x, defPosition.y, defPosition.z);
  return camera;
};

export { Camera };

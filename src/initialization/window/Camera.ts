import { PerspectiveCamera, Vector3 } from 'three';

/**
 * Initializes camera and places it to default position
 * @author Matej Hakoš
 *
 * @param {number} perspective Number representing perspective.
 * @param {Vector3} defPosition Default position, where a camera is placed.
 * @return {PerspectiveCamera}
 */
const camera = (perspective: number, defPosition: Vector3) => {
  const camera = new PerspectiveCamera(75, perspective, 0.1, 5000);

  camera.position.set(defPosition.x, defPosition.y, defPosition.z);
  return camera;
};

export { camera  };

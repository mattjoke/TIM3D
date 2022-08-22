import { PerspectiveCamera, Vector3 } from 'three';
/**
 * Initializes camera and places it to default position
 * @author Matej Hakoš
 *
 * @param {number} perspective Number representing perspective.
 * @param {Vector3} defPosition Default position, where a camera is placed.
 * @return {PerspectiveCamera}
 */
declare const camera: (perspective: number, defPosition: Vector3) => PerspectiveCamera;
export { camera };

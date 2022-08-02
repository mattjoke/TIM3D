import { AmbientLight, PointLight } from 'three';
/**
 * Initializes plane with default ambient and point light color.
 *
 * @return {[AmbientLight, PointLight]}
 */
declare const planeInit: () => (AmbientLight | PointLight)[];
export { planeInit };

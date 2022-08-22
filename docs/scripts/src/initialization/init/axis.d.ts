import { Group } from 'three';
/**
 * Main axis function, which calls {@link constructAxis}.
 * @author Matej Hakoš
 *
 * @param {number} scaling Scaling of axis
 * @return {[Line,Line,Line]} An array of x,y and z axis generated
 */
declare const axis: (scaling: number) => Group;
export { axis };

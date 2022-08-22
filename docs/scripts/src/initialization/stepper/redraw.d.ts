import { Quaternion, Vector3 } from 'three';
import { ManualStep } from './ManualStep';
import { Object3D } from 'types/Object3D';
import { Tween } from '@tweenjs/tween.js';
import { getObjectFunction } from '../../types/applicationTypes';
/**
 * Animates position of an object using Tween.
 *
 * @param {Object3D} obj An object, which should be animated.
 * @param {Vector3} to A Vector3 position of final place.
 * @param {?number} [delay] Optional delay in ms.
 * @return {Tween} an Instance of Tween.
 */
declare const animatePosition: (obj: Object3D, to: Vector3, delay?: number) => Tween<Vector3>;
/**
 * Animates rotation (using Quaterions) of an object using Tween.
 *
 * @param {Object3D} from An object, which should be animated.
 * @param {Quaternion} to A Quaternion rotation, which should be used.
 * @param {?number} [delay] Optional delay in ms.
 * @return {Tween} an Instance of Tween.
 */
declare const animateRotation: (from: Object3D, to: Quaternion, delay?: number) => Tween<Quaternion>;
/**
 * Handles redrawing of object on specific step
 * @author Matej Hakoš
 *
 * @param {ManualStep} currentStep Current step that should be redrawn.
 * @param {getObjectFunction} getObject Helper funciton, that returns object by position.
 * @param {ComputedPostions} computedPositions Comupted positons.
 * @param {boolean} reversed move objects in reverse.
 */
declare const redraw: (currentStep: ManualStep, getObject: getObjectFunction) => void;
export { redraw, animatePosition, animateRotation };

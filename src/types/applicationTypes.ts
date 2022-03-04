import { Event, Color as ThreeColor } from 'three';

import Object3D from 'stuff/Object3D';
import { Tween } from '@tweenjs/tween.js';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @typedef {ObjectID}
 */
export type ObjectID = string | number;
/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @typedef {Objects3D}
 */
export type Objects3D = Map<ObjectID, Object3D>;
/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @typedef {Color}
 */
export type Color = ThreeColor | string;
/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @typedef {Animations}
 */
export type Animations = Map<string, AnimationDef>;
/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @typedef {AnimationDef}
 */
export type AnimationDef = (obj: Object3D) => Tween<any> | void;
/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @typedef {UUID}
 */
export type UUID = string;

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @typedef {CallbackFunction}
 */
export type CallbackFunction = (obj: Object3D, ev: Event) => void;

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface inputPosition
 * @typedef {inputPosition}
 */
export interface inputPosition {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {number}
   */
  clientX: number;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {number}
   */
  clientY: number;
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface containerSize
 * @typedef {containerSize}
 */
export interface containerSize {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {number}
   */
  width: number;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {number}
   */
  height: number;
}

import { Event, Quaternion, Color as ThreeColor, Vector3 } from 'three';

import { Object3D } from 'stuff/Object3D';
import { Tween } from '@tweenjs/tween.js';

/**
 * Type definition for ObjectID.
 * The ID is string or number.
 * @author Matej Hakoš
 *
 * @export
 * @typedef {ObjectID}
 */
export type ObjectID = string | number;
/**
 * All loaded objects are stored in this map.
 * @author Matej Hakoš
 *
 * @export
 * @typedef {Objects3D}
 */
export type Objects3D = Map<ObjectID, Object3D>;

/**
 * Contains all poses precomputed before rendering.
 *
 * @export
 * @typedef {computedPostions}
 */
export type ComputedPostions = Map<ObjectID, RuntimePose>;

/**
 * Exactly like Pose, but contains Three.js objects instead od arrays
 *
 * @export
 * @typedef {RuntimePose}
 */
export type RuntimePose = {
  /**
   * Current Pose of object.
   * Does not activelly update object.
   *
   * @type {?Vector3}
   */
  position?: Vector3;

  /**
   * Current orientation of object.
   * Does not activelly update obejct.
   *
   * @type {?Quaternion}
   */
  orientation?: Quaternion;

  /**
   * Optional animation, that is played
   * when this object is animated.
   *
   * @type {?AnimationDef}
   */
  animation?: AnimationDef;
};
/**
 * Supported are all css colors.
 * @author Matej Hakoš
 *
 * @export
 * @typedef {Color}
 */
export type Color = ThreeColor | string;
/**
 * Map with all animations.
 * @author Matej Hakoš
 *
 * @export
 * @typedef {Animations}
 */
export type Animations = Map<string, AnimationDef>;
/**
 * Definition for animation functions.
 * @author Matej Hakoš
 *
 * @export
 * @typedef {AnimationDef}
 */
export type AnimationDef = (
  obj: Object3D
) => Tween<Record<string, unknown>> | void;
/**
 * UUID of instance.
 * @author Matej Hakoš
 *
 * @export
 * @typedef {UUID}
 */
export type UUID = string;

/**
 * Definition of callbacks.
 * @author Matej Hakoš
 *
 * @export
 * @typedef {CallbackFunction}
 */
export type CallbackFunction = (obj: Object3D, ev: Event) => void;

/**
 * Defintion of getObject Function.
 * @author Matej Hakoš
 *
 * @export
 * @typedef {getObjectFunction}
 */
export type getObjectFunction = (key: ObjectID) => Object3D | undefined;

/**
 * Definition of HTML element size.
 *
 * @export
 * @typedef {elementSizing}
 */
export type elementSizing = { width: number; height: number };

/**
 * Defines input position of mouse/touch.
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
 * Definition of HTML element size.
 * @author Matej Hakoš
 *
 * @export
 * @interface containerSize
 * @typedef {containerSize}
 */
export interface containerSize {
  /**
   * A width of element.
   * @author Matej Hakoš
   *
   * @type {number}
   */
  width: number;
  /**
   * A height of element.
   * @author Matej Hakoš
   *
   * @type {number}
   */
  height: number;
}

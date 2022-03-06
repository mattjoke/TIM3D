import { Color, Mesh } from 'three';
import { ObjectID } from './applicationTypes';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @typedef {Objects}
 */
export type Objects = Map<string | number, Mesh>;

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface Pose
 * @typedef {Pose}
 */
export interface Pose {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?[x: number, y: number, z: number]}
   */
  position?: [x: number, y: number, z: number];
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?[x: number, y: number, z: number, w: number]}
   */
  orientation?: [x: number, y: number, z: number, w: number];
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface Position
 * @typedef {Position}
 */
export interface Position {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {ObjectID}
   */
  id: ObjectID;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {Pose}
   */
  pose: Pose;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?string}
   */
  animation?: string;
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface Step
 * @typedef {Step}
 */
export interface Step {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {string}
   */
  name: string;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {Position[]}
   */
  positions: Position[];
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?string}
   */
  animation?: string;
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface File
 * @typedef {File}
 */
export interface File {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {string}
   */
  file: string;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?ObjectID}
   */
  name?: ObjectID;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {string}
   */
  id: string;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?(Color | string)}
   */
  color?: Color | string;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?Pose}
   */
  pose?: Pose;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?string}
   */
  animation?: string;
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface JSON
 * @typedef {JSON}
 */
export interface JSON {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?File[]}
   */
  files?: File[];
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?Step[]}
   */
  steps?: Step[];
}

import { Color } from 'three';
import { ObjectID } from './applicationTypes';

/**
 * Definition of Pose.
 * @author Matej Hakoš
 *
 * @export
 * @interface Pose
 * @typedef {Pose}
 */
export interface Pose {
  /**
   * Position that is added to "base" file position.
   * @author Matej Hakoš
   *
   * @type {?[x: number, y: number, z: number]}
   */
  position?: [x: number, y: number, z: number];
  /**
   * A quaternion orientation of loaded object.
   * @author Matej Hakoš
   *
   * @type {?[x: number, y: number, z: number, w: number]}
   */
  orientation?: [x: number, y: number, z: number, w: number];
}

/**
 * Definition of Position defined in file JSON.
 * @author Matej Hakoš
 *
 * @export
 * @interface Position
 * @typedef {Position}
 */
export interface Position {
  /**
   * Id of object, which should be moved/oriented.
   * @author Matej Hakoš
   *
   * @type {ObjectID}
   */
  id: ObjectID;
  /**
   * New position/orientation.
   * @author Matej Hakoš
   *
   * @type {Pose}
   */
  pose: Pose;
  /**
   * Optional animation to play after move.
   * @author Matej Hakoš
   *
   * @type {?string}
   */
  animation?: string;
}

/**
 * Definition of Step.
 * @author Matej Hakoš
 *
 * @export
 * @interface Step
 * @typedef {Step}
 */
export interface Step {
  /**
   * Name of step.
   * @author Matej Hakoš
   *
   * @type {string}
   */
  name: string;
  /**
   * An array of positions, that should be changed in one turn.
   * @author Matej Hakoš
   *
   * @type {Position[]}
   */
  positions: Position[];
  /**
   * Optional animation to be played on all objects defined in 'positions'.
   * @author Matej Hakoš
   *
   * @type {?string}
   */
  animation?: string;
}

/**
 * Definition of a file.
 * @author Matej Hakoš
 *
 * @export
 * @interface File
 * @typedef {File}
 */
export interface File {
  /**
   * A path to file, that should be loaded.
   * @author Matej Hakoš
   *
   * @type {string}
   */
  file: string;
  /**
   * Optional name of the loaded file.
   * @author Matej Hakoš
   *
   * @type {?ObjectID}
   */
  name?: ObjectID;
  /**
   * A <strong>unique</strong> id of an item. 
   * It is used for indexing and aniamtion handeling. 
   * @author Matej Hakoš
   *
   * @type {string}
   */
  id: string;
  /**
   * Custom predefined color of loaded file.
   * Supports css's string colors. 
   * 'random' or undefined color generates random color. 
   * @author Matej Hakoš
   *
   * @type {?(Color | string)}
   */
  color?: Color | string;
  /**
   * Default Pose of loaded file.
   * @author Matej Hakoš
   *
   * @type {?Pose}
   */
  pose?: Pose;
}

/**
 * Definition of input JSON.
 * @author Matej Hakoš
 *
 * @export
 * @interface JSON
 * @typedef {JSON}
 */
export interface JSON {
  /**
   * An array of file definitons.
   * @author Matej Hakoš
   *
   * @type {?File[]}
   */
  files?: File[];
  /**
   * An array of step definitons.
   * @author Matej Hakoš
   *
   * @type {?Step[]}
   */
  steps?: Step[];
}

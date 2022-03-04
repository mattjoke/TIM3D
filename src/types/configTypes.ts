import { Color } from 'three';

// TODO implement class type inference
/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface Extension
 * @typedef {Extension}
 */
export interface Extension {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?Function}
   */
  camera?: Function;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?Function}
   */
  controls?: Function;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?Function}
   */
  overlay?: Function;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?Function}
   */
  renderer?: Function;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?object}
   */
  scene?: object;
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @typedef {ShowSidebar}
 */
type ShowSidebar = boolean | false;

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface Sidebar
 * @typedef {Sidebar}
 */
export interface Sidebar {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?HTMLElement}
   */
  body?: HTMLElement;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?boolean}
   */
  visible?: boolean;
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface Colors
 * @typedef {Colors}
 */
export interface Colors {
  // Scene color
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?(Color | string)}
   */
  backgroundColor?: Color | string;
  // Highlight color
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?(Color | string)}
   */
  emissiveColor?: Color | string;
  // Selection color
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?(Color | string)}
   */
  selectionColor?: Color | string;
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @export
 * @interface Config
 * @typedef {Config}
 */
export interface Config {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?Colors}
   */
  colors?: Colors;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?{
      startPosition?: [x: number, y: number, z: number];
      centerOfWorld?: [x: number, y: number, z: number];
      globalRotation?: [x: number, y: number, z: number, w: number];
    }}
   */
  world?: {
    startPosition?: [x: number, y: number, z: number];
    centerOfWorld?: [x: number, y: number, z: number];
    globalRotation?: [x: number, y: number, z: number, w: number];
  };
  // Instance container
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?HTMLElement}
   */
  container?: HTMLElement;
  // Overlay div
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?HTMLElement}
   */
  loadingOverlay?: HTMLElement;
  // Sidebar div
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?{
      body?: HTMLElement;
      visible?: ShowSidebar;
    }}
   */
  sidebar?: {
    body?: HTMLElement;
    visible?: ShowSidebar;
  };

  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?[string]}
   */
  animationLoop?: [string];

  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?Extension}
   */
  extensions?: Extension;
}

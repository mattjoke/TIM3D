import { Color } from 'three';
/**
 * Experimental (WIP) functions.
 *
 * @export
 * @interface Extension
 * @typedef {Extension}
 */
export interface Extension {
    /**
     * Unused property, in future possible custom renderer
     *
     * @type {?() => void}
     */
    renderer?: () => void;
    /**
     * Unused property, in future possible custom scene
     *
     * @type {?object}
     */
    scene?: object;
}
/**
 * Boolean type if sidebar is shown.
 * @author Matej Hakoš
 *
 * @typedef {ShowSidebar}
 */
declare type ShowSidebar = boolean | false;
/**
 * Sidebar basic config
 * @author Matej Hakoš
 *
 * @export
 * @interface Sidebar
 * @typedef {Sidebar}
 */
export interface Sidebar {
    /**
     * Contains HTML element which will render on fullscreen.
     *
     * @type {?HTMLElement}
     */
    body?: HTMLElement;
    /**
     * If body should be rendered on fullscreen.
     *
     * @type {?boolean}
     */
    visible?: boolean;
}
/**
 * Basic color config setup.
 * @author Matej Hakoš
 *
 * @export
 * @interface Colors
 * @typedef {Colors}
 */
export interface Colors {
    /**
     * Background scene color.
     *
     * @type {?(Color | string)}
     */
    backgroundColor?: Color | string;
    /**
     * Emissive (highlight) color.
     *
     * @type {?(Color | string)}
     */
    emissiveColor?: Color | string;
    /**
     * Color of selected item.
     *
     * @type {?(Color | string)}
     */
    selectionColor?: Color | string;
}
/**
 * Interface for Config declaration.
 * This config interface is resposible for initial setup of colors,
 * positons and overlays.
 * @author Matej Hakoš
 *
 * @export
 * @interface Config
 * @typedef {Config}
 */
export interface Config {
    /**
     * Color setup for manual.
     *
     * @type {?Colors}
     */
    colors?: Colors;
    /**
     * Sets position of camera, OrbitalControls and global orientation.
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
    /**
     * HTML element to which manual should 'bind' and start to render.
     *
     * @type {?HTMLElement}
     */
    container?: HTMLElement;
    /**
     * HTML of custom loading overlay.
     *
     * @type {?HTMLElement}
     */
    loadingOverlay?: HTMLElement;
    /**
     * Sidebar config, with 'body' containing HTML element,
     * which should be rendered and 'visible' if the body is visible
     * on fullscreen.
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
     * An array of steps which should loop.
     *
     * @type {?Array<string>}
     */
    animationLoop?: Array<string>;
    /**
     * Antoher extension fields. (WIP)
     *
     * @type {?Extension}
     */
    extensions?: Extension;
}
export {};

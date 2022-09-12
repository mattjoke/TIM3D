import { Config } from '../types/configTypes';
import { Container } from './window/Container';
import { Scene } from './window/Scene';
import { Vector3 } from 'three';
/**
 * Class that handles rendering and handleing animating.
 * @author Matej Hakoš
 *
 * @class Window
 * @typedef {Window}
 */
declare class Window {
    /**
     * Instance of scene.
     *
     * @public
     * @type {Scene}
     */
    scene: Scene;
    /**
     * Instance of renderer.
     *
     * @private
     * @type {Renderer}
     */
    private renderer;
    /**
     * Instance of Camera.
     *
     * @private
     * @type {Camera}
     */
    private camera;
    /**
     * Instance of HTML Container.
     *
     * @public
     * @type {Container}
     */
    container: Container;
    /**
     * Instance of OrbitalControls.
     *
     * @private
     * @type {OrbitalControls}
     */
    private orbitalControls;
    /**
     * Pauses randering and computation for this instance.
     *
     * @private
     * @type {boolean}
     */
    private pauseRendering;
    /**
     * Creates an instance of Window.
     *
     * @constructor
     * @param {Config} config
     */
    constructor(config: Config);
    /**
     * Resets camera to starting postion.
     *
     * @public
     */
    resetCamera(): void;
    /**
     * Returns current instance of camera.
     *
     * @public
     * @return {Camera}
     */
    getCamera(): import("three").PerspectiveCamera;
    /**
     * Returns current instance of Scene.
     *
     * @public
     * @return {Scene}
     */
    getScene(): Scene;
    /**
     * Returns current instance of container.
     *
     * @public
     * @return {HTMLElement}
     */
    getContainer(): HTMLElement;
    /**
     * Indicates if Instance's rendering is paused/unpaused.
     *
     * @public
     * @param {boolean} value
     */
    setRendering(value: boolean): void;
    /**
     * Sets camera/controls to specific view.
     *
     * @public
     * @param {Vector3} position
     * @param {Quaternion} orientation
     */
    setCamera(position: Vector3): void;
    /**
     * Destroys this instance.
     *
     * @public
     */
    destroy(): void;
    /**
     * Callback which handles sizing issues while resizing of the window.
     *
     * @private
     */
    private onWindowResize;
    /**
     * Renders animations, updates renderer.
     * Possible pause of animations/rendering.
     *
     * @public
     */
    animate(): void;
}
export { Window };

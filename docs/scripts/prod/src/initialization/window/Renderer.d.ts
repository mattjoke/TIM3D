import { Camera, PerspectiveCamera, Scene } from 'three';
import { containerSize } from '../../types/applicationTypes';
import { Colors } from '../../types/configTypes';
/**
 * Initializes and handles rendering.
 * @author Matej Hakoš
 *
 * @class Renderer
 * @typedef {Renderer}
 */
declare class Renderer {
    /**
     * Current WebGL rendering instance.
     *
     * @private
     * @type {WebGLRenderer}
     */
    private renderer;
    /**
     * HTML element to which renderer render data.
     *
     * @public
     * @type {HTMLElement}
     */
    domElement: HTMLElement;
    /**
     * Locks highlight rendering.
     *
     * @private
     * @type {boolean}
     */
    private locker;
    /**
     * Last highlighted Mesh.
     *
     * @private
     * @type {(Mesh | null)}
     */
    private lastHighlight;
    /**
     * Custom highlight color.
     *
     * @private
     * @type {(Color | string | undefined)}
     */
    private customEmissive;
    /**
     * Creates an instance of Renderer.
     *
     * @constructor
     * @param {containerSize} { width, height }
     * @param {Scene} scene
     * @param {Camera} camera
     * @param {?Colors} [colors]
     */
    constructor({ width, height }: containerSize, scene: Scene, camera: Camera, colors?: Colors);
    /**
     * Initializes basic callbacks (touch events, double click...).
     *
     * @public
     * @param {Scene} scene
     * @param {Camera} camera
     */
    initCallbacks(scene: Scene, camera: Camera): void;
    /**
     * Locks rendering and sets lastHighlight to normal color.
     *
     * @public
     */
    lockHighlight(): void;
    /**
     * Unlocks highlight.
     *
     * @public
     */
    unlockHightlight(): void;
    /**
     * Destroys this instance.
     *
     * @public
     */
    destroy(): void;
    /**
     * Sets size of renderer and DOM element.
     *
     * @public
     * @param {containerSize} { width, height }
     */
    setSize({ width, height }: containerSize): void;
    /**
     * Renders this scene with camera.
     *
     * @public
     * @param {Scene} scene
     * @param {PerspectiveCamera} camera
     */
    render(scene: Scene, camera: PerspectiveCamera): void;
    /**
     * Returns bounding box of DOM element.
     *
     * @public
     * @return {DOMRect}
     */
    getBoundingRect(): DOMRect;
    /**
     * Computes raycast based on input postion, scene and camera.
     *
     * @private
     * @param {inputPosition} position
     * @param {Scene} scene
     * @param {Camera} camera
     * @return {Intersection[]}
     */
    private computeRaycast;
    /**
     * Handles "click" of the object.
     *
     * @private
     * @param {inputPosition} position
     * @param {Scene} scene
     * @param {Camera} camera
     */
    private selectObject;
    /**
     * Handles "hover" over the object.
     *
     * @private
     * @param {inputPosition} position
     * @param {Scene} scene
     * @param {Camera} camera
     */
    private highlightObject;
}
export { Renderer };

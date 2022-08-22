import { Camera, Vector3 } from 'three';
import { Renderer } from './Renderer';
/**
 * Class that initializes Three.js's OrbitControls and handles user interaction.
 * @author Matej Hakoš
 *
 * @class OrbitalControls
 * @typedef {OrbitalControls}
 */
declare class OrbitalControls {
    /**
     * Current instance of OrbitControls.
     *
     * @private
     * @type {OrbitControls}
     */
    private controls;
    /**
     * Current instance of Camera.
     *
     * @private
     * @type {Camera}
     */
    private camera;
    /**
     * Starting camera/controls postion.
     *
     * @private
     * @type {Vector3}
     */
    private startingPosition;
    /**
     * Focus point of OrbitControls.
     *
     * @private
     * @type {Vector3}
     */
    private worldPosition;
    /**
     * Creates an instance of OrbitalControls.
     *
     * @constructor
     * @param {Camera} camera
     * @param {Renderer} renderer
     */
    constructor(camera: Camera, renderer: Renderer);
    /**
     * Sets starting postion of camera.
     *
     * @public
     * @param {Vector3} position
     */
    setStartingPosition(position: Vector3): void;
    /**
     * Sets starting focus point for controls.
     *
     * @public
     * @param {Vector3} worldPosition
     */
    setWorldPosition(worldPosition: Vector3): void;
    /**
     * Destroys instances.
     *
     * @public
     */
    destroy(): void;
    /**
     * Manually updates controls (important for easing).
     *
     * @public
     */
    update(): void;
    /**
     * Resets current control postion to predefined position (animated).
     *
     * @public
     */
    reset(): void;
    /**
     * Animates position of camera.
     * Camera will look to staring position.
     *
     * @public
     * @param {Vector3} position
     * @param {Quaternion} orientation
     */
    animateNewPosition(position: Vector3): void;
}
export { OrbitalControls };

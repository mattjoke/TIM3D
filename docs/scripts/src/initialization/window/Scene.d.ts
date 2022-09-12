import { Color, Object3D, Scene as ThreeScene } from 'three';
/**
 * Wrapper over Three.js's Scene.
 * @author Matej Hakoš
 *
 * @class Scene
 * @typedef {Scene}
 */
declare class Scene {
    /**
     * Three.js instance of Scene.
     *
     * @private
     * @type {ThreeScene}
     */
    private instance;
    /**
     * Creates an instance of Scene.
     *
     * @constructor
     * @param {?(Color | string)} [backgroundColor]
     */
    constructor(backgroundColor?: Color | string);
    /**
     * Initializes axes helper (for debug).
     *
     * @private
     */
    private initAxexHelper;
    /**
     * Returns instance of Three.js Scene.
     *
     * @public
     * @return {ThreeScene}
     */
    getInstance(): ThreeScene;
    /**
     * Destroys current instance.
     *
     * @public
     */
    destroy(): void;
    /**
     * Removes all children in the scene
     *
     * @public
     */
    clear(): void;
    /**
     * Adds object/s to the Scene.
     *
     * @public
     * @param {...Object3D[]} objects
     */
    addObject(...objects: Object3D[]): void;
}
export { Scene };

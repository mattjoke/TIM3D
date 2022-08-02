import { CameraView, ObjectID, Objects3D } from '../types/applicationTypes';
import { Object3D } from 'three';
import { Config } from '../types/configTypes';
import { JSON } from '../types/jsonTypes';
import { Stepper } from './Stepper';
/**
 * Initialization class, handles all important classes.
 * @author Matej Hakoš
 *
 * @class Init
 * @typedef {Init}
 */
declare class Init {
    /**
     * A Window instance, which handles Scene and Renderer.
     *
     * @private
     * @type {Window}
     */
    private window;
    /**
     * An overlay HTML Div element.
     *
     * @private
     * @type {HTMLDivElement}
     */
    private overlay;
    /**
     * A Stepper instance.
     *
     * @private
     * @type {(Stepper | undefined)}
     */
    private stepper;
    /**
     * Map which contains all loaded and drawn objects.
     *
     * @private
     * @type {Objects3D}
     */
    private objects;
    /**
     * Unique ID of instance.
     *
     * @private
     * @type {string}
     */
    private parentUUID;
    /**
     * Current loaded and parsed config.
     *
     * @private
     * @type {Config}
     */
    private config;
    /**
     * Boolean, which signalizes, if objects are successfully loaded.
     *
     * @public
     * @type {boolean}
     */
    objectsLoaded: boolean;
    /**
     * Creates an instance of Init.
     *
     * @constructor
     * @param {Config} config
     * @param {string} uuid
     */
    constructor(config: Config, uuid: string);
    /**
     * Calls planeInit and initializes lights and axes.
     *
     * @private
     */
    private initPlane;
    /**
     * Initializes axes.
     *
     * @private
     */
    private initAxes;
    /**
     * Async function, which takes JSON as input, checks it, parses it and loads all files.
     *
     * @public
     * @param {JSON} json
     */
    withJSON(json: JSON): void;
    /**
     * Check input object for patter matching and input sanitization.
     *
     * @private
     * @param {object} object
     * @param {JsonCheck | ConfigCheck} checker
     * @return {boolean}
     */
    private checker;
    /**
     * Returns this instace of Stepper.
     *
     * @public
     * @return {Stepper}
     */
    getStepper(): Stepper | undefined;
    /**
     * Returns a new promise and resolves it after t miliseconds.
     *
     * @private
     * @param {number} t
     * @return {Promise}
     */
    private delay;
    /**
     * Asynchronously returns items.
     *
     * @public
     * @async
     * @return {Objects3D}
     */
    getItems(): Promise<Objects3D>;
    /**
     * Asynchronously finds and item and returns it.
     *
     * @public
     * @async
     * @param {ObjectID} selector
     * @return {Object3D}
     */
    getItem(selector: ObjectID): Promise<import("../types/Object3D").Object3D | undefined>;
    /**
     * Adds objects to rendering Scene.
     *
     * @public
     * @param {...*} objects
     */
    addObjects(...objects: Object3D[]): void;
    /**
     * Sets Stepper's step programatically.
     *
     * @public
     * @param {number} stepNumber
     */
    setStep(stepNumber: number): void;
    /**
     * Destorys this instance.
     *
     * @public
     */
    destroy(): void;
    /**
     * Pauses rendering of the Window.
     *
     * @public
     */
    pauseRendering(): void;
    /**
     * Resumes rendering.
     *
     * @public
     */
    resumeRendering(): void;
    /**
     * Returns current instance of camera.
     *
     * @public
     * @return {Camera}
     */
    getCamera(): import("three").PerspectiveCamera;
    /**
     * Sets view based on CameraView.
     *
     * @public
     * @param {CameraView} view
     */
    setView(view: CameraView): void;
}
export { Init };

import { AnimationDef, CallbackFunction, CameraCallback, CameraView, ObjectID, Objects3D } from './types/applicationTypes';
import { Config } from './types/configTypes';
import { JSON } from './types/jsonTypes';
import { Object3D } from 'types/Object3D';
/**
 * Factory of instance.
 * @author Matej Hakoš
 *
 * @class Factory
 * @module Factory
 * @typedef {Factory}
 */
declare class Factory {
    /**
     * Returns an instance of an Init
     * @author Matej Hakoš
     *
     * @private
     * @type {(Init | null)}
     */
    private instance;
    /**
     * Returns if objects are already loaded to the scene
     * @author Matej Hakoš
     *
     * @public
     * @type {boolean}
     */
    objectsLoaded: boolean;
    /**
     * UUID of instance.
     * @author Matej Hakoš
     *
     * @private
     * @type {UUID}
     */
    private uuid;
    /**
     * Number of instances currently live.
     * @author Matej Hakoš
     *
     * @static
     * @type {number}
     */
    static instanceCounter: number;
    /**
     * Creates an instance of Factory.
     *
     * @constructor
     * @param {?Config} [config]
     */
    constructor(config?: Config);
    /**
     * Generated UUID for this instance.
     *
     * @private
     * @return {UUID}
     */
    private generateUUID;
    /**
     * Loads input JSON file.
     *
     * @public
     * @param {JSON} json
     * @return {this}
     */
    loadJSON(json: JSON): this;
    /**
     * Destroys this instance.
     *
     * @public
     */
    destroy(): void;
    /**
     * Returns item based on its id.
     *
     * @public
     * @param {ObjectID} id
     * @return {Object3D|undefined}
     */
    getItem(id: ObjectID): Promise<Object3D | undefined> | undefined;
    /**
     * Selects item in scene. (Same as double click on the item).
     *
     * @public
     * @param {ObjectID} id
     */
    selectItem(id: ObjectID): void;
    /**
     * Manually moves stepper to the specified step.
     *
     * @public
     * @param {number} stepNumber
     */
    moveToStep(stepNumber: number): void;
    /**
     * Returns all the obejcts loaded into scene.
     *
     * @public
     * @return {Objects3D}
     */
    getObjects(): Promise<Objects3D> | undefined;
    /**
     * Sets scaling for ALL objects in the scene.
     *
     * @public
     * @param {number} scaling
     */
    setScaling(scaling: number): void;
    /**
     * Adds a callback to selector object.
     *
     * @public
     * @param {ObjectID} selector
     * @param {string} event
     * @param {CallbackFunction} callback
     */
    on(selector: ObjectID, event: string, callback: CallbackFunction): void;
    /**
     * Adds a callback to all loaded objects.
     *
     * @public
     * @param {string} event
     * @param {CallbackFunction} callback
     */
    group(event: string, callback: CallbackFunction): void;
    /**
     * Returns animation from AnimationStorage.
     *
     * @public
     * @param {string} animationName
     * @return {AnimationDef|undefined}
     */
    getAnimation(animationName: string): AnimationDef | undefined;
    /**
     * Returns all animations in AnimationStorage.
     *
     * @public
     * @return {Animations}
     */
    getAnimations(): import("./types/applicationTypes").Animations;
    /**
     * Adds an animation to AnimationStorage.
     *
     * @public
     * @param {string} animationName
     * @param {AnimationDef} animtaion
     */
    addAdnimation(animationName: string, animtaion: AnimationDef): void;
    /**
     * Removes an animation from AnimationStorage.
     *
     * @public
     * @param {string} animationName
     */
    removeAnimation(animationName: string): void;
    /**
     * Sets an alias for the animation.
     *
     * @public
     * @param {string} animationName
     * @param {string} aliasName
     */
    aliasAnimation(animationName: string, aliasName: string): void;
    /**
     * Pauses rendering of the Instance.
     *
     * @public
     */
    pauseRendering(): void;
    /**
     * Resumes rendering of the Instance.
     *
     * @public
     */
    resumeRendering(): void;
    /**
     * Returns current instance of camera.
     *
     * @public
     */
    getCamera(): void;
    /**
     * Updates camera with function.
     *
     * @param {CameraCallback} callback
     */
    updateCamera(callback: CameraCallback): void;
    /**
     * Sets camera to predefined view.
     *
     * @public
     * @param {?CameraView} [view]
     * @param {?string} [viewString]
     */
    setView(view?: CameraView): void;
}
export { Factory };

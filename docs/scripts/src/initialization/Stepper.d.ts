import { ComputedPostions, getObjectFunction } from '../types/applicationTypes';
import { JSON } from '../types/jsonTypes';
/**
 * This class handles 'stepping' of manual.
 * @author Matej Hakoš
 *
 * @class Stepper
 * @typedef {Stepper}
 */
declare class Stepper {
    /**
     * Contains base computed postions.
     *
     * @private
     * @type {ComputedPostions}
     */
    private computedPositions;
    /**
     * A helper function that returns object from Init class.
     *
     * @private
     * @type {getObjectFunction}
     */
    private getObject;
    /**
     * Currently drawn step of manual.
     *
     * @private
     * @type {ManualStep}
     */
    private currentStep;
    /**
     * Current index of step.
     *
     * @private
     * @type {number}
     */
    private currentStepPosition;
    /**
     * Overall length of all steps.
     *
     * @public
     * @type {number}
     */
    length: number;
    /**
     * Signaler that sends callback to other classes.
     *
     * @public
     * @type {EventTarget}
     */
    signaler: EventTarget;
    /**
     * The root of the manual steps.
     *
     * @private
     * @type {(ManualStep | null)}
     */
    private root;
    /**
     * An array of strings, which corresponds to names of steps,
     * which will be indefinately looped.
     *
     * @private
     * @type {([string] | [])}
     */
    private animationLoop;
    /**
     * Indicates, if stepper should compute and render.
     *
     * @private
     * @type {boolean}
     */
    private pauseRendering;
    /**
     * Creates an instance of Stepper.
     *
     * @constructor
     * @param {JSON} json
     * @param {getObjectFunction} getObject
     * @param {ComputedPostions} computedPositions
     * @param {?[string]} [animationLoop]
     */
    constructor(json: JSON, getObject: getObjectFunction, computedPositions: ComputedPostions, animationLoop?: [string]);
    /**
     * Redraw current frame with camera and scene.
     * Sends update event.
     *
     * @private
     */
    private redraw;
    /**
     * Destroys this instance.
     *
     * @public
     */
    destroy(): void;
    /**
     * Finds next step based on name of the step in input JSON.
     *
     * @private
     * @param {string} name
     */
    private findLoopNext;
    /**
     * Sets position of stepper to postion.
     *
     * @public
     * @param {number} position
     * @return {number}
     */
    setStep(position: number): number;
    /**
     * Returns index of current step.
     *
     * @public
     * @return {number}
     */
    getCurrentStep(): number;
    /**
     * Returns Computed Positions.
     *
     * @public
     * @return {ComputedPostions}
     */
    getComputedPositions(): ComputedPostions;
    /**
     * Sets rendering boolean.
     *
     * @public
     * @param {boolean} val
     */
    setRendering(val: boolean): void;
}
export { Stepper };

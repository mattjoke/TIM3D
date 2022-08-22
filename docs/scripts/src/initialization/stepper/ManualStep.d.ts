import { AnimationDef, ComputedPostions, ObjectID, Objects3D, RuntimePose } from '../../types/applicationTypes';
import { Position, Step } from '../../types/jsonTypes';
/**
 * Class that hold information about currently shown/displayed
 * step.
 * @author Matej Hakoš
 *
 * @class ManualStep
 * @typedef {ManualStep}
 */
declare class ManualStep {
    /**
     * Link to previous Manual Step.
     *
     * @type {(ManualStep | null)}
     */
    prev: ManualStep | null;
    /**
     * Link to next Manual Step.
     *
     * @type {(ManualStep | null)}
     */
    next: ManualStep | null;
    /**
     * Name of currenty drawn/displayed step.
     *
     * @type {string}
     */
    name: string;
    /**
     * An array of objects with Pose, where they should move.
     *
     * @type {Position[]}
     */
    positions: Position[];
    /**
     * A map with computed exact positions of all of the objects in scene
     *
     * @type {ComputedPostions}
     */
    computedPostions: ComputedPostions;
    /**
     * Optional animation.
     *
     * @type {?AnimationDef}
     */
    animation?: AnimationDef;
}
/**
 * Parses positions from object map.
 *
 * @param {Objects3D} objects
 * @return {ComputedPostions}
 */
declare const computePositions: (objects: Objects3D) => Map<ObjectID, RuntimePose>;
/**
 * Build a linked list of Steps.
 *
 * @param {Steps[]} steps
 * @param {ComputedPostions} computedPositions
 * @return {obj} A root and length of linked list.
 */
declare const buildSteps: (steps: Step[] | undefined, computedPositions: ComputedPostions) => {
    root: null;
    length: number;
} | {
    root: ManualStep;
    length: number;
};
export { ManualStep, buildSteps, computePositions };

import { AnimationDef, Animations } from '../../types/applicationTypes';
/**
 * Animation storage pre-generates and holds user defined animtaions globally.
 * @author Matej Hakoš
 *
 * @class AnimationStorage
 * @typedef {AnimationStorage}
 */
declare class AnimationStorage {
    /**
     * Static Map containing all animations.
     *
     * @private
     * @static
     * @type {Animations}
     */
    private static animations;
    /**
     * Creates an instance of AnimationStorage.
     *
     * @constructor
     * @private
     */
    private constructor();
    /**
     * Pre-generates default animations.
     *
     * @private
     * @static
     */
    private static loadDefaultAnimations;
    /**
     * Returns global instance.
     *
     * @public
     * @static
     * @readonly
     * @type {AnimationStorage}
     */
    static get Instance(): typeof AnimationStorage;
    /**
     * Returns names of all loaded animations.
     *
     * @public
     * @static
     * @return {Array<string>}
     */
    static getAnimations(): Animations;
    /**
     * Returns animation based on name parameter.
     *
     * @public
     * @static
     * @param {string} name
     * @return {(AnimationDef | undefined)}
     */
    static getAnimation(name: string): AnimationDef | undefined;
    /**
     * Adds animation with 'name' to Map.
     *
     * @public
     * @static
     * @param {string} name
     * @param {AnimationDef} animation
     */
    static addAnimation(name: string, animation: AnimationDef): void;
    /**
     * Removes animation 'name' from Map.
     *
     * @public
     * @static
     * @param {string} name
     */
    static removeAnimation(name: string): void;
    /**
     * Set an alias to animation in AnimationStorage.
     * I.e. two functions are functionally the same,
     * but have 2 different names (e.g. x360deg, xscrew).
     *
     * @public
     * @static
     * @param {string} animationName
     * @param {string} aliasName
     */
    static setAlias(animationName: string, aliasName: string): void;
}
export { AnimationStorage };

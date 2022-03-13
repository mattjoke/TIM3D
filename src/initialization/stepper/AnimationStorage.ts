import { AnimationDef, Animations } from '../../types/applicationTypes';
import { Easing, Tween } from '@tweenjs/tween.js';

import { MathUtils } from 'three';
import { Object3D } from 'stuff/Object3D';

/**
 * Animation storage pre-generates and holds user defined animtaions globally.
 * @author Matej Hakoš
 *
 * @class AnimationStorage
 * @typedef {AnimationStorage}
 */
class AnimationStorage {
  /**
   * Static Map containing all animations.
   *
   * @private
   * @static
   * @type {Animations}
   */
  private static animations: Animations;

  /**
   * Creates an instance of AnimationStorage.
   *
   * @constructor
   * @private
   */
  private constructor() {
    AnimationStorage.loadDefaultAnimations();
  }

  /**
   * Pre-generates default animations.
   *
   * @private
   * @static
   */
  private static loadDefaultAnimations() {
    if (AnimationStorage.Instance.getAnimations().size != 0) return;

    const lables = ['x', 'y', 'z'];
    lables.forEach((label) => {
      for (let i = 0; i <= 360; i++) {
        AnimationStorage.animations.set(`${label}${i}deg`, (obj: Object3D) => {
          const start = {
            angle: 0
          };
          const stop = {
            angle: i
          };
          let lastAngle = 0;
          return new Tween(start).to(stop, 500).onUpdate(() => {
            const angle = start.angle;
            const radians = MathUtils.degToRad(angle - lastAngle) / 2;
            switch (label) {
              case 'x':
                obj.getMesh().rotateX(radians);
                break;
              case 'y':
                obj.getMesh().rotateY(radians);
                break;
              case 'z':
                obj.getMesh().rotateZ(radians);
                break;
            }
            obj.setOutlineFromMesh();
            lastAngle = angle;
          });
        });
      }
      this.setAlias(`${label}360deg`, `${label}screw`);
    });
  }

  /**
   * Returns global instance.
   *
   * @public
   * @static
   * @readonly
   * @type {AnimationStorage}
   */
  public static get Instance() {
    if (AnimationStorage.animations == null) {
      AnimationStorage.animations = new Map<string, AnimationDef>();
      AnimationStorage.loadDefaultAnimations();
    }
    return AnimationStorage;
  }

  /**
   * Returns names of all loaded animations.
   *
   * @public
   * @static
   * @return {Array<string>}
   */
  public static getAnimations() {
    return AnimationStorage.Instance.animations;
  }

  /**
   * Returns animation based on name parameter.
   *
   * @public
   * @static
   * @param {string} name
   * @return {(AnimationDef | undefined)}
   */
  public static getAnimation(name: string): AnimationDef | undefined {
    return AnimationStorage.getAnimations().get(name);
  }

  /**
   * Adds animation with 'name' to Map.
   *
   * @public
   * @static
   * @param {string} name
   * @param {AnimationDef} animation
   */
  public static addAnimation(name: string, animation: AnimationDef) {
    AnimationStorage.getAnimations().set(name, animation);
  }

  /**
   * Removes animation 'name' from Map.
   *
   * @public
   * @static
   * @param {string} name
   */
  public static removeAnimation(name: string) {
    AnimationStorage.getAnimations().delete(name);
  }

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
  public static setAlias(animationName: string, aliasName: string) {
    const animation = AnimationStorage.getAnimation(animationName);
    if (animation == null) return;
    AnimationStorage.getAnimations().set(aliasName, animation);
  }
}

export { AnimationStorage };

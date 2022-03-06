import { AnimationDef, Animations } from '@manualTypes/applicationTypes';
import { Easing, Tween } from '@tweenjs/tween.js';

import { MathUtils } from 'three';
import Object3D from 'stuff/Object3D';

/**
 * Description placeholder
 * @date 3/4/2022 - 11:02:02 AM
 *
 * @class AnimationStorage
 * @typedef {AnimationStorage}
 */
class AnimationStorage {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @static
   * @type {Animations}
   */
  private static animations: Animations;

  /**
   * 
   */
  private constructor() {
    AnimationStorage.loadDefaultAnimations();
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 11:02:19 AM
   *
   * @private
   * @static
   */
  private static loadDefaultAnimations() {
    if (AnimationStorage.Instance.getAnimations().size != 0) return;

    const lables = ['x', 'y', 'z'];
    lables.forEach((label) => {
      AnimationStorage.animations.set(`${label}screw`, (obj: Object3D) => {
        const start = { angle: 0 };
        const end = { angle: 2 * Math.PI };
        let lastRotation = 0;
        new Tween(start)
          .to(end)
          .easing(Easing.Quadratic.InOut)
          .onUpdate(() => {
            switch (label) {
              case 'x':
                obj.getMesh().rotateX(start.angle - lastRotation);
                break;
              case 'y':
                obj.getMesh().rotateY(start.angle - lastRotation);
                break;
              case 'z':
                obj.getMesh().rotateZ(start.angle - lastRotation);
                break;
            }
            obj.setOutlineFromMesh();
            lastRotation = start.angle;
          });
      });

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
    });
  }

  
  
  /**
   * Description placeholder
   * @date 3/4/2022 - 11:03:19 AM
   *
   * @public
   * @static
   * @readonly
   * @type {this}
   */
  public static get Instance() {
    if (AnimationStorage.animations == null) {
      AnimationStorage.animations = new Map<string, AnimationDef>();
      AnimationStorage.loadDefaultAnimations();
    }
    return AnimationStorage;
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 11:03:28 AM
   *
   * @public
   * @static
   * @return {Array<string>}
   */
  public static getAnimations() {
    return AnimationStorage.Instance.animations;
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 11:04:06 AM
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
   * Description placeholder
   * @date 3/4/2022 - 11:04:16 AM
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
   * Description placeholder
   * @date 3/4/2022 - 11:04:21 AM
   *
   * @public
   * @static
   * @param {string} name
   */
  public static removeAnimation(name: string) {
    AnimationStorage.getAnimations().delete(name);
  }
  
  // 
  /**
   * Set an alias to animation in AnimationStorage
   * I.e. two functions are the same, but have 2 different names (e.g. x360deg, xscrew)
   * @date 3/4/2022 - 11:04:26 AM
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

export default AnimationStorage;

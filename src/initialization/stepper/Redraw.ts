import { Easing, Tween } from '@tweenjs/tween.js';
import { Quaternion, Vector3 } from 'three';

import { AnimationDef } from '@manualTypes/applicationTypes';
import AnimationStorage from './AnimationStorage';
import { ManualStep } from './ManualStep';
import Object3D from 'stuff/Object3D';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {Object3D} from
 * @param {Vector3} to
 * @param {?number} [delay]
 * @return {*}
 */
const animatePosition = (from: Object3D, to: Vector3, delay?: number) => {
  return new Tween(from.getMesh().position)
    .to({ x: to.x, y: to.y, z: to.z }, delay ?? 300)
    .onStart(() => {
      new Tween(from.getOutline().position)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 300)
        .start();
    });
};

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {Object3D} from
 * @param {Quaternion} to
 * @param {?number} [delay]
 * @return {*}
 */
const animateRotation = (from: Object3D, to: Quaternion, delay?: number) => {
  return new Tween(from.getMesh().quaternion)
    .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
    .onStart(() => {
      new Tween(from.getOutline().quaternion)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
        .start();
    });
};

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {ManualStep} currentStep
 * @param {Function} getObject
 */
const Redraw = (currentStep: ManualStep, getObject: Function) => {
  for (const position of currentStep.positions) {
    const obj: Object3D = getObject(position.id);
    if (obj == null) continue;

    const rotation = new Quaternion().fromArray(
      position.pose.orientation ?? [0, 0, 0, 0]
    );

    const animation = animatePosition(
      obj,
      new Vector3().fromArray(position.pose.position ?? [0, 0, 0])
    ).chain(animateRotation(obj, rotation));

    const anim = currentStep.animation as AnimationDef;
    if (anim != null) {
      const computeAnimation = anim(obj);
      if (computeAnimation) {
        // @ts-ignore
        animation.chain(computeAnimation);
      }
    }

    currentStep.positions.forEach((position) => {
      if (position.animation == null) return;
      const anim = AnimationStorage.Instance.getAnimation(position.animation);
      if (anim == null) return;
      const object = getObject(position.id);
      const result = anim(object);
      if (result) {
        animation.chain(result);
      }
    });

    animation.easing(Easing.Quadratic.InOut);
    animation.start();

    obj.setOutlineFromMesh();
  }
};

export { Redraw, animatePosition, animateRotation };

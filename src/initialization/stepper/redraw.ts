import { AnimationDef, getObjectFunction } from '../../types/applicationTypes';
import { Easing, Tween } from '@tweenjs/tween.js';
import { Quaternion, Vector3 } from 'three';

import { AnimationStorage } from './AnimationStorage';
import { ManualStep } from './ManualStep';
import { Object3D } from 'stuff/Object3D';

/**
 * Animates position of an object using Tween.
 *
 * @param {Object3D} obj An object, which should be animated.
 * @param {Vector3} to A Vector3 position of final place.
 * @param {?number} [delay] Optional delay in ms.
 * @return {Tween} an Instance of Tween.
 */
const animatePosition = (obj: Object3D, to: Vector3, delay?: number) => {
  return new Tween(obj.getMesh().position)
    .to({ x: to.x, y: to.y, z: to.z }, delay ?? 300)
    .onStart(() => {
      new Tween(obj.getOutline().position)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 300)
        .start();
    });
};

/**
 * Animates rotation (using Quaterions) of an object using Tween.
 *
 * @param {Object3D} from An object, which should be animated.
 * @param {Quaternion} to A Quaternion rotation, which should be used.
 * @param {?number} [delay] Optional delay in ms.
 * @return {Tween} an Instance of Tween.
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
 * Handles redrawing of object on specific step
 * @author Matej Hakoš
 *
 * @param {ManualStep} currentStep Current step that should be redrawn.
 * @param {Function} getObject Helper funciton, that returns object by position.
 */
const redraw = (currentStep: ManualStep, getObject: getObjectFunction) => {
  for (const position of currentStep.positions) {
    const obj = getObject(position.id);
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
        animation.chain(computeAnimation);
      }
    }

    currentStep.positions.forEach((position) => {
      if (position.animation == null) return;
      const anim = AnimationStorage.Instance.getAnimation(position.animation);
      if (anim == null) return;
      const object = getObject(position.id);
      if (object == null) return;
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

export { redraw, animatePosition, animateRotation };

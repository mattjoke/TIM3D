import { Quaternion, Vector3 } from 'three';

import { AnimationStorage } from './AnimationStorage';
import { ManualStep } from './ManualStep';
import { Object3D } from 'types/Object3D';
import { Tween } from '@tweenjs/tween.js';
import { getObjectFunction } from '../../types/applicationTypes';

const DELAY = 100;

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
    .to({ x: to.x, y: to.y, z: to.z }, delay ?? DELAY)
    .onStart(() => {
      new Tween(obj.getOutline().position)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? DELAY)
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
    .to({ x: to.x, y: to.y, z: to.z }, delay ?? DELAY)
    .onStart(() => {
      new Tween(from.getOutline().quaternion)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? DELAY)
        .start();
    });
};

/**
 * Handles redrawing of object on specific step
 * @author Matej Hakoš
 *
 * @param {ManualStep} currentStep Current step that should be redrawn.
 * @param {getObjectFunction} getObject Helper funciton, that returns object by position.
 * @param {ComputedPostions} computedPositions Comupted positons.
 * @param {boolean} reversed move objects in reverse.
 */
const redraw = (currentStep: ManualStep, getObject: getObjectFunction) => {
  // console.log(currentStep.computedPostions);
  for (const position of currentStep.computedPostions) {
    const [key, value] = position;
    const obj = getObject(key);
    if (obj == null) continue;

    if (value.animation) {
      const output = value.animation(obj);
      if (output) {
        output.start();
      }
    }

    // TODO: this
    currentStep.positions.forEach((position) => {
      if (position.animation == null) return;
      const anim = AnimationStorage.Instance.getAnimation(position.animation);
      if (anim == null) return;
      const object = getObject(position.id);
      if (object == null) return;
      const result = anim(object);
      if (result) {
        result.start();
      }
    });

    const animation = new Tween({});
    if (value.orientation) {
      animateRotation(obj, value.orientation).start();
    }

    if (value.position) {
      animatePosition(obj, value.position).start();
    }

    animation.update();
  }
};

export { redraw, animatePosition, animateRotation };

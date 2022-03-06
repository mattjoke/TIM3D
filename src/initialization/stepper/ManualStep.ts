import { Position, Step } from '../../types/jsonTypes';

import { AnimationDef } from '../../types/applicationTypes';
import { AnimationStorage } from './AnimationStorage';

/**
 * Class that hold information about currently shown/displayed
 * step.
 * @author Matej Hakoš
 *
 * @class ManualStep
 * @typedef {ManualStep}
 */
class ManualStep {
  /**
   * Link to previous Manual Step.
   *
   * @type {(ManualStep | null)}
   */
  prev: ManualStep | null = null;
  /**
   * Link to next Manual Step.
   *
   * @type {(ManualStep | null)}
   */
  next: ManualStep | null = null;
  /**
   * Name of currenty drawn/displayed step.
   *
   * @type {string}
   */
  name = '';
  /**
   * An array of objects with Pose, where they should move.
   *
   * @type {Position[]}
   */
  positions: Position[] = [];
  /**
   * Optional animation.
   *
   * @type {?AnimationDef}
   */
  animation?: AnimationDef;
}

const buildSteps = (steps: Step[] | undefined) => {
  if (steps == null) return { root: null, length: 0 };
  let prev = null;
  let length = 0;
  for (const step of steps) {
    const curr = new ManualStep();
    curr.name = step.name.toString() || '';
    curr.positions = step.positions;
    curr.animation = AnimationStorage.Instance.getAnimation(
      step.animation ?? ''
    );
    curr.prev = prev;
    if (prev) {
      prev.next = curr;
    }
    length++;
    prev = curr;
  }
  while (prev != null && prev.prev != null) {
    prev = prev.prev;
  }
  return { root: prev, length: length };
};

export { ManualStep, buildSteps };

import { Position, Step } from '../../types/jsonTypes';

import { AnimationDef } from '../../types/applicationTypes';
import { AnimationStorage } from './AnimationStorage';

/**
 * This is simple class
 */
class ManualStep {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {(ManualStep | null)}
   */
  prev: ManualStep | null = null;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {(ManualStep | null)}
   */
  next: ManualStep | null = null;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {string}
   */
  name = '';
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {Position[]}
   */
  positions: Position[] = [];
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @type {?AnimationDef}
   */
  animation?: AnimationDef;
}

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {(Step[] | undefined)} steps
 * @return {{ root: any; length: number; }}
 */
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

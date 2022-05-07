import {
  AnimationDef,
  ComputedPostions,
  ObjectID,
  Objects3D,
  RuntimePose
} from '../../types/applicationTypes';
import { Position, Step } from '../../types/jsonTypes';
import { Quaternion, Vector3 } from 'three';

import { AnimationStorage } from './AnimationStorage';
import { deepCopyMap } from '../../utils/Utils';

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
   * A map with computed exact positions of all of the objects in scene
   *
   * @type {ComputedPostions}
   */
  computedPostions: ComputedPostions = new Map();
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
const computePositions = (objects: Objects3D) => {
  const poses = new Map<ObjectID, RuntimePose>();
  objects.forEach((obj, key) => {
    poses.set(key, obj.getPose());
  });
  return poses;
};

/**
 * Build a linked list of Steps.
 *
 * @param {Steps[]} steps
 * @param {ComputedPostions} computedPositions
 * @return {obj} A root and length of linked list.
 */
const buildSteps = (
  steps: Step[] | undefined,
  computedPositions: ComputedPostions
) => {
  if (steps == null) return { root: null, length: 0 };
  let computeMap = deepCopyMap(computedPositions);

  // Setup for root (0th step)
  const root = new ManualStep();
  root.computedPostions = deepCopyMap(computeMap);
  root.name = 'Init state';

  let prev = root;
  let length = 1; // because of the 0th step.

  for (const step of steps) {
    const curr = new ManualStep();
    curr.name = step.name.toString() || '';

    curr.positions = step.positions;
    curr.animation = AnimationStorage.Instance.getAnimation(
      step.animation ?? ''
    );

    const cumulativeMap = deepCopyMap(computeMap);
    // Computes steps for each object
    for (const position of step.positions) {
      const o = cumulativeMap.get(position.id) as RuntimePose;
      if (o == null) continue;

      if (position.pose.position) {
        o.position = new Vector3().fromArray(position.pose.position);
      }
      if (position.pose.orientation) {
        o.orientation = new Quaternion()
          .fromArray(position.pose.orientation)
          .normalize();
      }
      o.animation = AnimationStorage.Instance.getAnimation(
        step.animation ?? ''
      );
      cumulativeMap.set(position.id, o);
    }

    curr.computedPostions = deepCopyMap(cumulativeMap);

    // Animations does not translate when deep-copying
    cumulativeMap.forEach((val, key) => {
      const cumulative = val.animation;
      if (cumulative) {
        const obj = curr.computedPostions.get(key);
        if (obj == null) return;
        obj.animation = cumulative;
        curr.computedPostions.set(key, obj);
      }
    });

    computeMap = cumulativeMap;

    curr.prev = prev;
    if (prev) {
      prev.next = curr;
    }
    length++;
    prev = curr;
  }
  return { root: root, length: length };
};

export { ManualStep, buildSteps, computePositions };

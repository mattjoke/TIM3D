import { ManualStep, buildSteps } from './stepper/ManualStep';

import { JSON } from '../types/jsonTypes';
import { getObjectFunction } from '../types/applicationTypes';
import { redraw } from './stepper/redraw';

/**
 * This class handles 'stepping' of manual.
 * @author Matej Hakoš
 *
 * @class Stepper
 * @typedef {Stepper}
 */
class Stepper {
  /**
   * A helper function that returns object from Init class.
   *
   * @private
   * @type {Function}
   */
  private getObject: getObjectFunction;
  /**
   * Currently drawn step of manual.
   *
   * @private
   * @type {ManualStep}
   */
  private currentStep: ManualStep;
  /**
   * Current index of step.
   *
   * @private
   * @type {number}
   */
  private currentStepPosition = 0;
  /**
   * Overall length of all steps.
   *
   * @public
   * @type {number}
   */
  public length = 0;
  /**
   * Signaler that sends callback to other classes.
   *
   * @public
   * @type {EventTarget}
   */
  public signaler;

  /**
   * The root of the manual steps.
   *
   * @private
   * @type {(ManualStep | null)}
   */
  private root: ManualStep | null;
  /**
   * An array of strings, which corresponds to names of steps, 
   * which will be indefinately looped.
   *
   * @private
   * @type {([string] | [])}
   */
  private animationLoop: [string] | [];

  /**
   * Creates an instance of Stepper.
   *
   * @constructor
   * @param {JSON} json
   * @param {Function} getObject
   * @param {?[string]} [animationLoop]
   */
  constructor(json: JSON, getObject: getObjectFunction, animationLoop?: [string]) {
    this.getObject = getObject;
    this.signaler = new EventTarget();

    const { root, length } = buildSteps(json.steps);
    this.currentStep = root ?? new ManualStep();
    this.root = root;
    this.length = length;

    this.animationLoop = animationLoop ?? [];

    requestAnimationFrame(this.redraw.bind(this));

    // Loop Animations
    if (this.animationLoop.length > 0) {
      let i = 0;
      const loop = () => {
        setTimeout(() => {
          const el = this.animationLoop[i];
          setTimeout(() => {
            this.findLoopNext(el);
          }, 1000);
          i++;
          if (i >= this.animationLoop.length) {
            i = 0;
          }
          loop();
        }, 1000 * this.animationLoop.length);
      };
      loop();
    }
  }

  /**
   * Redraw current frame with camera and scene.
   * Sends update event.
   *
   * @private
   */
  private redraw() {
    redraw(this.currentStep, this.getObject);
    this.signaler.dispatchEvent(
      new CustomEvent('update', {
        detail: this.currentStepPosition
      })
    );
  }

  /**
   * Destroys this instance.
   *
   * @public
   */
  public destroy() {
    this.currentStep = new ManualStep();
    this.currentStepPosition = 0;
    this.length = 0;
    this.root = null;
    this.animationLoop = [];
  }

  /**
   * Finds next step based on name of the step in input JSON.
   *
   * @private
   * @param {string} name
   */
  private findLoopNext(name: string) {
    if (this.root == null) {
      return;
    }
    let curr = this.root;
    let pos = 0;
    while (curr.name != name) {
      if (curr.next == null) {
        break;
      }
      curr = curr.next;
      pos++;
    }
    this.setStep(pos);
  }

  /**
   * Sets position of stepper to postion.
   *
   * @public
   * @param {number} position
   * @return {number}
   */
  public setStep(position: number) {
    while (this.currentStepPosition != position) {
      if (position > this.currentStepPosition) {
        if (this.currentStep.next == null) {
          break;
        }
        this.currentStep = this.currentStep.next;
        this.currentStepPosition++;
        this.redraw();
      } else {
        if (this.currentStep.prev == null) {
          break;
        }
        this.currentStep = this.currentStep.prev;
        this.currentStepPosition--;
      }
      this.redraw();
    }
    return this.currentStepPosition;
  }

  /**
   * Returns index of current step.
   *
   * @public
   * @return {number}
   */
  public getCurrentStep() {
    return this.currentStepPosition;
  }
}

export { Stepper };

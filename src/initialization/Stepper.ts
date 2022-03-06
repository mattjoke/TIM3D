import { ManualStep, buildSteps } from './stepper/ManualStep';

import { JSON } from '../types/jsonTypes';
import { Redraw } from './stepper/Redraw';

/**
 * Description placeholder
 * @date 3/4/2022 - 12:25:03 PM
 * @author Matej Hakoš
 *
 * @class Stepper
 * @typedef {Stepper}
 */
class Stepper {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {Function}
   */
  private getObject: Function;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {ManualStep}
   */
  private currentStep: ManualStep;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {number}
   */
  private currentStepPosition = 0;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @public
   * @type {number}
   */
  public length = 0;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @public
   * @type {*}
   */
  public signaler;

  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {(ManualStep | null)}
   */
  private root: ManualStep | null;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {([string] | [])}
   */
  private animationLoop: [string] | [];

  
  /**
   * Creates an instance of Stepper.
   * @date 3/4/2022 - 12:25:09 PM
   * @author Matej Hakoš
   *
   * @constructor
   * @param {JSON} json
   * @param {Function} getObject
   * @param {?[string]} [animationLoop]
   */
  constructor(json: JSON, getObject: Function, animationLoop?: [string]) {
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
   * Description placeholder
   * @date 3/4/2022 - 12:25:16 PM
   * @author Matej Hakoš
   *
   * @private
   */
  private redraw() {
    Redraw(this.currentStep, this.getObject);
    this.signaler.dispatchEvent(
      new CustomEvent('update', {
        detail: this.currentStepPosition
      })
    );
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:25:19 PM
   * @author Matej Hakoš
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
   * Description placeholder
   * @date 3/4/2022 - 12:25:22 PM
   * @author Matej Hakoš
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
   * Description placeholder
   * @date 3/4/2022 - 12:25:26 PM
   * @author Matej Hakoš
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
   * Description placeholder
   * @date 3/4/2022 - 12:25:31 PM
   * @author Matej Hakoš
   *
   * @public
   * @return {number}
   */
  public getCurrentStep() {
    return this.currentStepPosition;
  }
}

export {Stepper};

import { JSON } from "../types/jsonTypes";
import { buildSteps, ManualStep } from "./stepper/ManualStep";
import { Redraw } from "./stepper/Redraw";

class Stepper {
    private getObject: Function;
    private currentStep: ManualStep;
    private currentStepPosition = 0;
    public length = 0;

    constructor(json: JSON, getObject: Function) {
        this.getObject = getObject;
        const { root, length } = buildSteps(json.steps);
        this.currentStep = root ?? new ManualStep();
        this.length = length;
        requestAnimationFrame(this.redraw.bind(this));
    }

    private redraw() {
        Redraw(this.currentStep, this.getObject);
    }

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

    public getCurrentStep() {
        return this.currentStepPosition;
    }
}

export default Stepper;

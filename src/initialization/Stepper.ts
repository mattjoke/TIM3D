import { JSON, Position, Step } from "../types/jsonTypes";
import { Objects3D } from "@manualTypes/applicationTypes";

interface BuildSteps {
    root: StepOfManual | null;
    length: number;
}

class StepOfManual {
    prev: StepOfManual | null = null;
    next: StepOfManual | null = null;
    name!: string;
    positions: Position[] = [];
}

const buildSteps = (steps: Step[] | undefined): BuildSteps => {
    if (steps == null) return { root: null, length: 0 };
    let prev = null;
    let length = 0;
    for (const step of steps) {
        const curr = new StepOfManual();
        curr.name = step.name ?? length.toString();
        curr.positions = step.positions;
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

class Stepper {
    private objects: Objects3D;
    private currentStep: StepOfManual;
    private currentStepPosition = 0;
    public length = 0;

    constructor(json: JSON, objects: Objects3D) {
        this.objects = objects;
        const { root, length } = buildSteps(json.steps);
        this.currentStep = root ?? new StepOfManual();
        this.length = length;
        requestAnimationFrame(this.redraw.bind(this));
    }

    private redraw() {
        console.log(this.currentStep);
        for (const position of this.currentStep.positions) {
            const { x, y, z } = position.position;
            this.objects.get(position.name)?.getMesh().position.set(x, y, z);
            this.objects.get(position.name)?.getOutline().position.set(x, y, z);
        }
    }

    public setStep(position: number) {
        while (this.currentStepPosition != position) {
            if (position > this.currentStepPosition) {
                if (this.currentStep.next === undefined) {
                    break;
                }
                this.moveStepUp();
            } else {
                if (this.currentStep.prev == null) {
                    break;
                }
                this.moveStepDown();
            }
        }
    }
    public moveStepUp() {
        if (this.currentStep.next) {
            this.currentStep = this.currentStep.next;
            this.currentStepPosition++;
        }
        this.redraw();
    }

    public moveStepDown() {
        if (this.currentStep.prev) {
            this.currentStep = this.currentStep.prev;
            this.currentStepPosition--;
        }
        this.redraw();
    }
}
export default Stepper;

import { Objects3D } from "../types/applicationTypes";
import { JSON, Position, Step } from "../types/jsonTypes";

class StepOfManual {
    prev: StepOfManual | null;
    next: StepOfManual | null;
    name: string;
    positions: Position[];
}

const buildSteps = (steps: Step[]): [StepOfManual, number] => {
    let prev = null;
    let length = 0;
    for (const step of steps) {
        const curr = new StepOfManual();
        curr.name = step.name;
        curr.positions = step.positions;
        curr.prev = prev;
        if (prev) {
            prev.next = curr;
        }
        length++;
        prev = curr;
    }
    while (prev.prev != null) {
        prev = prev.prev;
    }
    return [prev, length];
};

class Stepper {
    private objects: Objects3D;
    private currentStep: StepOfManual;
    private currentStepPosition = 0;
    public length = 0;

    constructor(json: JSON, objects: Objects3D) {
        this.objects = objects;
        const build = buildSteps(json.steps);
        this.currentStep = build[0];
        this.length = build[1];
        requestAnimationFrame(this.redraw.bind(this))
    }

    private redraw() {
        console.log(this.currentStep);
        for (const position of this.currentStep.positions) {
            const { x, y, z } = position.position;
            this.objects.get(position.name).position.set(x, y, z);
            this.objects.get(`${position.name}-outline`).position.set(x, y, z);
        }
    }

    public setStep(position: number) {
        while (this.currentStepPosition != position) {
            if (position > this.currentStepPosition) {
                if (this.currentStep.next == null){
                    break;
                } 
                this.moveStepUp();
            } else {
                if (this.currentStep.prev == null){
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

    public getObjects() {
        return this.objects;
    }
}
export default Stepper;

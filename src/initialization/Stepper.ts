import { Mesh } from "three";
import Loader from "../stuff/Loader";
import { JSON, Position, Step, File } from "../types/jsonTypes";

class Step_of_manual {
    prev: Step_of_manual | null;
    next: Step_of_manual | null;
    name: string;
    positions: Position[];
}

const buildSteps = (steps: Step[]): [Step_of_manual, number] => {
    let prev = null;
    let length = 0;
    for (const step of steps) {
        let curr = new Step_of_manual();
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
    private static objects: Map<string | number, Mesh>;
    private static currentStep: Step_of_manual;
    private static currentStepPosition = 0;
    public length = 0;
    constructor(json: JSON) {
        this.hey(json.files).then(() => {
            Stepper.redraw();
        });
        const build = buildSteps(json.steps);
        Stepper.currentStep = build[0];
        this.length = build[1];
    }
    hey = async (files: File[]) => {
        Stepper.objects = await Loader(files);
    };

    private static redraw() {
        console.log(Stepper.currentStep);
        for (const position of Stepper.currentStep.positions) {
            const { x, y, z } = position.position;
            this.objects.get(position.name).position.set(x, y, z);
        }
    }

    public static setStep(position: number) {
        while (this.currentStepPosition != position) {
            console.log(position, this.currentStepPosition);
            if (position > this.currentStepPosition) {
                this.moveStepUp();
            } else {
                this.moveStepDown();
            }
        }
    }
    public static moveStepUp() {
        if (this.currentStep.next) {
            this.currentStep = this.currentStep.next;
            this.currentStepPosition++;
        }
        this.redraw();
    }

    public static moveStepDown() {
        if (this.currentStep.prev) {
            this.currentStep = this.currentStep.prev;
            this.currentStepPosition--;
        }
        this.redraw();
    }
}
export default Stepper;

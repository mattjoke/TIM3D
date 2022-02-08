import { AnimationDef } from "@manualTypes/applicationTypes";
import { Position, Step } from "@manualTypes/jsonTypes";
import AnimationStorage from "./AnimationStorage";

class ManualStep {
    prev: ManualStep | null = null;
    next: ManualStep | null = null;
    name: string = "";
    positions: Position[] = [];
    animation?: AnimationDef;
}

const buildSteps = (steps: Step[] | undefined) => {
    if (steps == null) return { root: null, length: 0 };
    let prev = null;
    let length = 0;
    for (const step of steps) {
        const curr = new ManualStep();
        curr.name = step.name.toString() || "";
        curr.positions = step.positions;
        curr.animation = AnimationStorage.Instance.getAnimation(
            step.animation ?? ""
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

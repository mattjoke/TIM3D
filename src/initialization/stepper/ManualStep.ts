import { Position, Step } from "@manualTypes/jsonTypes";
import { Tween } from "@tweenjs/tween.js";
import { object, TypeOf } from "zod";
import AnimationStorage from "./AnimationStorage";

class ManualStep {
    prev: ManualStep | null = null;
    next: ManualStep | null = null;
    name!: string;
    positions: Position[] = [];
    animation?: Function;
}

const buildSteps = (steps: Step[] | undefined) => {
    if (steps == null) return { root: null, length: 0 };
    let prev = null;
    let length = 0;
    for (const step of steps) {
        const curr = new ManualStep();
        curr.name = step.name ?? length.toString();
        curr.positions = step.positions;
        curr.animation = AnimationStorage.Instance.getAnimation(step.animation ?? "") as Function;     
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

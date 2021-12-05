import { Easing, Tween } from "@tweenjs/tween.js";
import Object3D from "stuff/Object3D";
import { Euler, Quaternion, Vector3 } from "three";
import { ManualStep } from "./ManualStep";

const animatePosition = (from: Vector3, to: Vector3, delay?: number) => {
    new Tween(from)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
        .easing(Easing.Quadratic.InOut)
        .start();
};

const animateRotation = (from: Euler, to: Quaternion, delay?: number) => {
    new Tween(from)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
        .easing(Easing.Quadratic.InOut)
        .start();
};

const Redraw = (currentStep: ManualStep, getObject: Function) => {
    for (const position of currentStep.positions) {
        const obj: Object3D = getObject(position.name);
        if (obj == null) continue;

        const rotation = new Quaternion().fromArray(position.rotation ?? []);

        animatePosition(
            obj.getMesh().position,
            new Vector3().fromArray(position.position)
        );
        animateRotation(obj.getMesh().rotation, rotation);

        animatePosition(
            obj.getOutline().position,
            new Vector3().fromArray(position.position)
        );
        animateRotation(obj.getOutline().rotation, rotation);
    }
};

export { Redraw, animatePosition, animateRotation };


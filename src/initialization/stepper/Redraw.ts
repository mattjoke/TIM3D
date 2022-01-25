import { AnimationDef } from "@manualTypes/applicationTypes";
import { Easing, Tween } from "@tweenjs/tween.js";
import Object3D from "stuff/Object3D";
import { Euler, Quaternion, Vector3 } from "three";
import { ManualStep } from "./ManualStep";

const animatePosition = (from: Object3D, to: Vector3, delay?: number) => {
    return new Tween(from.getMesh().position)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 300)
        .onStart(() => {
            new Tween(from.getOutline().position)
                .to({ x: to.x, y: to.y, z: to.z }, delay ?? 300)
                .start();
        });
};

const animateRotation = (from: Object3D, to: Euler, delay?: number) => {
    return new Tween(from.getMesh().rotation)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
        .onStart(() => {
            new Tween(from.getOutline().rotation)
                .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
                .start();
        });
};

const Redraw = (currentStep: ManualStep, getObject: Function) => {
    for (const position of currentStep.positions) {
        const obj: Object3D = getObject(position.name);
        if (obj == null) continue;

        const quaterRotation = new Quaternion().fromArray(
            position.rotation ?? [-0.7071068, 0, 0, 0.7071068]
        );

        const rotation = new Euler().setFromQuaternion(quaterRotation);

        const animation = animatePosition(
            obj,
            new Vector3().fromArray(position.position)
        ).chain(animateRotation(obj, rotation));

        const anim = currentStep.animation as AnimationDef;
        if (anim != null) {
            const computeAnimation = anim(obj);
            if (computeAnimation) {
                animation.chain(computeAnimation);
            }
        }
        animation.easing(Easing.Quadratic.InOut);
        animation.start();

        obj.getOutline().position.copy(obj.getMesh().position);
        obj.getOutline().rotation.copy(obj.getMesh().rotation);
    }
};

export { Redraw, animatePosition, animateRotation };


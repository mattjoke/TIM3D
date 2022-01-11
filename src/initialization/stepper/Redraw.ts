import { Easing, Tween } from "@tweenjs/tween.js";
import Object3D from "stuff/Object3D";
import { Euler, Quaternion, Vector3 } from "three";
import { ManualStep } from "./ManualStep";

const animatePosition = (from: Object3D, to: Vector3, delay?: number) => {
    return new Tween(from.getMesh().position)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
        .chain(
            new Tween(from.getOutline().position).to(
                { x: to.x, y: to.y, z: to.z },
                delay ?? 500
            )
        );
};

const animateRotation = (from: Object3D, to: Euler, delay?: number) => {
    return new Tween(from.getMesh().rotation)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
        .chain(
            new Tween(from.getOutline().rotation)
                .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
                .easing(Easing.Quadratic.InOut)
        );
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

        if (currentStep.animation) {
            animation.chain(currentStep.animation(obj));
        }
        animation.easing(Easing.Quadratic.InOut);
        animation.start();

        /*
        if (currentStep.animation) {
            animation.chain(currentStep.animation(obj));
        }
        animatePosition(
            obj.getOutline().position,
            new Vector3().fromArray(position.position)
        );
        animateRotation(obj.getOutline().rotation, rotation);*/
    }
};

export { Redraw, animatePosition, animateRotation };


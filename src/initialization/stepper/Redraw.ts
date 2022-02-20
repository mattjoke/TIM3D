import { AnimationDef } from "@manualTypes/applicationTypes";
import { Easing, Tween } from "@tweenjs/tween.js";
import Object3D from "stuff/Object3D";
import { Euler, Quaternion, Vector3 } from "three";
import AnimationStorage from "./AnimationStorage";
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

const animateRotation = (from: Object3D, to: Quaternion, delay?: number) => {
    return new Tween(from.getMesh().quaternion)
        .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
        .onStart(() => {
            new Tween(from.getOutline().quaternion)
                .to({ x: to.x, y: to.y, z: to.z }, delay ?? 500)
                .start();
        });
};

const Redraw = (currentStep: ManualStep, getObject: Function) => {
    for (const position of currentStep.positions) {
        const obj: Object3D = getObject(position.id);
        if (obj == null) continue;

        const rotation = new Quaternion().fromArray(
            position.rotation ?? [0, 0, 0, 0]
        );

        const animation = animatePosition(
            obj,
            new Vector3().fromArray(position.position)
        ).chain(animateRotation(obj, rotation));

        const anim = currentStep.animation as AnimationDef;
        if (anim != null) {
            const computeAnimation = anim(obj);
            if (computeAnimation) {
                //@ts-ignore
                animation.chain(computeAnimation);
            }
        }

        currentStep.positions.forEach((position) => {
            if (position.animation == null) return;
            const anim = AnimationStorage.Instance.getAnimation(
                position.animation
            );
            if (anim == null) return;
            const object = getObject(position.id);
            const result = anim(object);
            if (result) {
                animation.chain(result);
            }
        });

        animation.easing(Easing.Quadratic.InOut);
        animation.start();

        obj.setOutlineFromMesh();
    }
};

export { Redraw, animatePosition, animateRotation };

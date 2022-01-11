import { Animations } from "@manualTypes/applicationTypes";
import { Easing, Tween } from "@tweenjs/tween.js";
import Object3D from "stuff/Object3D";
import { MathUtils } from "three";

class AnimationStorage {
    private static animations: Animations;

    private constructor() {
        AnimationStorage.loadDefaultAnimations();
    }

    private static loadDefaultAnimations() {
        if (AnimationStorage.Instance.getAnimations().size != 0) return;

        const lables = ["x", "y", "z"];
        lables.forEach((label) => {
            AnimationStorage.animations.set(`${label}screw`, (obj: Object3D) => {
                    const start = { angle: 0 };
                    const end = { angle: 2 * Math.PI };
                    let lastRotation = 0;
                    new Tween(start)
                        .to(end)
                        .easing(Easing.Quadratic.InOut)
                        .onUpdate(() => {
                            switch (label) {
                                case "x":
                                    obj.getMesh().rotateX(
                                        start.angle - lastRotation
                                    );
                                    obj.getOutline().rotateX(
                                        start.angle - lastRotation
                                    );
                                    break;
                                case "y":
                                    obj.getMesh().rotateY(
                                        start.angle - lastRotation
                                    );
                                    obj.getOutline().rotateY(
                                        start.angle - lastRotation
                                    );
                                    break;
                                case "z":
                                    obj.getMesh().rotateZ(
                                        start.angle - lastRotation
                                    );
                                    obj.getOutline().rotateZ(
                                        start.angle - lastRotation
                                    );
                                    break;
                            }
                            lastRotation = start.angle;
                        });
                }
            );

            for (let i = 0; i <= 360; i++) {
                AnimationStorage.animations.set(`${label}${i}deg`, (obj: Object3D) => {
                        const start = {
                            angle: 0,
                        };
                        const stop = {
                            angle: i,
                        };
                        let lastAngle = 0;
                        return new Tween(start).to(stop, 500).onUpdate(() => {
                            const angle = start.angle;
                            const radians =
                                MathUtils.degToRad(angle - lastAngle) / 2;
                            switch (label) {
                                case "x":
                                    obj.getMesh().rotateX(radians);
                                    obj.getOutline().rotateX(radians);
                                    break;
                                case "y":
                                    obj.getMesh().rotateY(radians);
                                    obj.getOutline().rotateY(radians);
                                    break;
                                case "z":
                                    obj.getMesh().rotateZ(radians);
                                    obj.getOutline().rotateZ(radians);
                                    break;
                            }
                            lastAngle = angle;
                        });
                    }
                );
            }
        });
    }

    public static playAnimation(object: Object3D, animation?: string) {
        if (animation == null) {
            return;
        }
        const anim = this.getAnimation(animation);
        if (anim == null) {
            console.warn(`Invalid animation: ${animation}`);
            return;
        }
    }

    public static get Instance() {
        if (AnimationStorage.animations == null) {
            AnimationStorage.animations = new Map<string, Function>();
            AnimationStorage.loadDefaultAnimations();
        }
        return AnimationStorage;
    }

    public static getAnimations() {
        return AnimationStorage.animations;
    }

    public static getAnimation(name: string) {
        return AnimationStorage.getAnimations().get(name);
    }

    public static addAnimation(name: string, animation: typeof Tween) {
        AnimationStorage.getAnimations().set(name, animation);
    }
}

export default AnimationStorage;

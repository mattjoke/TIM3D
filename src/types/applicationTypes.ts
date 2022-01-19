import { Tween } from "@tweenjs/tween.js";
import Object3D from "stuff/Object3D";
import { Color as ThreeColor } from "three";

export type ObjectID = string | number;
export type Objects3D = Map<ObjectID, Object3D>;
export type Color = ThreeColor | string;
export type Animations = Map<string, AnimationDef>;
export type AnimationDef = (obj: Object3D) => Tween<any> | void;

export interface inputPosition {
    clientX: number;
    clientY: number;
}

export interface containerSize {
    width: number;
    height: number;
}

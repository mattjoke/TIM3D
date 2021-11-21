import Object3D from "stuff/Object3D";

export type ObjectID = string | number;
export type Objects3D = Map<ObjectID, Object3D>;

export interface inputPosition {
    clientX: number;
    clientY: number;
}

export interface containerSize {
    width: number;
    height: number;
}

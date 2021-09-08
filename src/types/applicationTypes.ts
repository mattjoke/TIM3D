import { Mesh } from "three";

export type ObjectID = string | number;
export type Objects3D = Map<ObjectID, Mesh>;


export interface inputPosition {
    clientX:number,
    clientY:number
}

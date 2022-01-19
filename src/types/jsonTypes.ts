import { Color, Mesh } from "three";
import { ObjectID } from "./applicationTypes";

export type Objects = Map<string | number, Mesh>;

export interface Pose {
    position: [x: number, y: number, z: number];
    orientation?: [x: number, y: number, z: number, w: number];
}

export interface Position {
    name: ObjectID;
    position: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number, w: number];
    animation?: string;
}

export interface Step {
    name?: string;
    positions: Position[];
    animation?: string;
}

export interface File {
    file: string;
    name: ObjectID;
    color?: Color | string;
    pose?: Pose;
}

export interface JSON {
    files?: File[];
    steps?: Step[];
}

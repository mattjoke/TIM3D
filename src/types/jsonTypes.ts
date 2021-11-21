import { Color, Mesh, Quaternion } from "three";
import { ObjectID } from "./applicationTypes";
import { Config } from "./configTypes";

export type Objects = Map<string | number, Mesh>;

export interface JSON {
    config?: Config;
    files?: File[];
    steps?: Step[];
}

export interface File {
    file: string;
    name: ObjectID;
    color?: Color | string;
    position?: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number, w:number];
}

export interface Step {
    name?: string;
    positions: Position[];
}

export interface Position {
    name: ObjectID;
    position: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number, w:number];
}

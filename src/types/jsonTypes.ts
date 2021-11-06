import { Color, Mesh, Vector3 } from "three";
import { Config } from "./configTypes";
import { ObjectID } from "./applicationTypes";

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
    rotation?: [x: number, y: number, z: number];
}

export interface Step {
    name?: string;
    positions: Position[];
}

export interface Position {
    name: ObjectID;
    position: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
}

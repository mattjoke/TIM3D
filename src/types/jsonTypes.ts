import { Color, Mesh, Vector3 } from "three";

export interface JSON {
    config?: {};
    files?: File[];
    steps?: Step[];
}

export interface File {
    file: string;
    color?: Color | string;
    name: string | number;
}

export interface Step {
    name?: string;
    positions: Position[];
}

export interface Position {
    name: string | number;
    position: Vector3;
}

export type Objects = Map<string | number, Mesh>;

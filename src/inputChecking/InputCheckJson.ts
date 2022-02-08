import { Color } from "three";
import {
    array,
    number,
    object,
    optional,
    string,
    instanceof as zedInstance,
} from "zod";

// export type ObjectID = string | number;
const objectID = string().or(number());

/*
export interface File {
    file: string;
    name: ObjectID;
    id: string;
    color?: Color | string;
    position?: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
}
*/
const fileSchema = object({
    id: string(),
    name: optional(objectID),
    file: string(),
    color: optional(string().or(zedInstance(Color))),
    pose: optional(
        object({
            position: optional(array(number()).length(3)),
            orientation: optional(array(number()).length(4)),
        })
    ),
    animation: optional(string()),
}).strict();

/*
    export interface Position {
        name: ObjectID;
        position: [x: number, y: number, z: number];
        rotation?: [x: number, y: number, z: number];
    }
    */
const positionSchema = object({
    id: string(),
    name: optional(objectID),
    position: array(number()).length(3),
    rotation: optional(
        array(number()).length(4, {
            message: "Rotation array does not have enough items",
        })
    ),
    animation: optional(string()),
}).strict();
/*    
    export interface Step {
        name?: string;
        positions: Position[];
    }
    */
const stepSchema = object({
    name: optional(string()),
    positions: array(positionSchema),
    animation: optional(string()),
}).strict();

/*
export interface JSON {
    config?: Config;
    files?: File[];
    steps?: Step[];
}
*/
const jsonSchema = object({
    files: optional(array(fileSchema)),
    steps: optional(array(stepSchema)),
}).strict();

export { jsonSchema, fileSchema, stepSchema, positionSchema };

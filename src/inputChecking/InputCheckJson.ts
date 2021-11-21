import { Color } from "three";
import { z } from "zod";
import { configSchema } from "./InputCheckConfig";

// export type ObjectID = string | number;
const objectID = z.string().or(z.number());

/*
export interface File {
    file: string;
    name: ObjectID;
    color?: Color | string;
    position?: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
}
*/
const fileSchema = z
    .object({
        file: z.string(),
        name: objectID,
        color: z.optional(z.string().or(z.instanceof(Color))),
        position: z.optional(z.array(z.number()).length(3)),
        rotation: z.optional(
            z
                .array(z.number())
                .length(4)
        ),
    })
    .strict();

/*
export interface Position {
    name: ObjectID;
    position: [x: number, y: number, z: number];
    rotation?: [x: number, y: number, z: number];
}
*/
const positionSchema = z
    .object({
        name: objectID,
        position: z.array(z.number()).length(3),
        rotation: z.optional(
            z
                .array(z.number())
                .length(4, {
                    message: "Rotation array does not have enough items",
                })
        ),
    })
    .strict();
/*    
export interface Step {
    name?: string;
    positions: Position[];
}
*/
const stepSchema = z
    .object({
        name: z.optional(z.string()),
        positions: z.array(positionSchema),
    })
    .strict();

/*
export interface JSON {
    config?: Config;
    files?: File[];
    steps?: Step[];
}
*/
const jsonSchema = z
    .object({
        config: z.optional(configSchema),
        files: z.optional(z.array(fileSchema)),
        steps: z.optional(z.array(stepSchema)),
    })
    .strict();

export { jsonSchema, fileSchema, stepSchema, positionSchema };

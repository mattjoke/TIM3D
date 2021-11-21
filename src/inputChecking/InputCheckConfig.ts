import { Color } from "three";
import { z } from "zod";

/*
export interface Config {
    container?: HTMLElement | null;
    enviroment?: {};
    overlay?: Element;
    movement?: {};
    color?: Color | string;
}
*/
const configSchema = z
    .object({
        container: z.optional(z.nullable(z.instanceof(HTMLElement))),
        enviroment: z.optional(z.object({})),
        overlay: z.optional(z.instanceof(Element)),
        movement: z.optional(z.object({})),
        color: z.optional(z.string().or(z.instanceof(Color))),
    })
    .strict();

export { configSchema };

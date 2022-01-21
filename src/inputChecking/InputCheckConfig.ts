import { Color } from "three";
import { z } from "zod";

const Colors = z.object({
    backgroundColor: z.optional(z.string().or(z.instanceof(Color))),
    emissiveColor: z.optional(z.string().or(z.instanceof(Color))),
    selectionColor: z.optional(z.string().or(z.instanceof(Color))),
});
/*
export interface Config {
    backgrounColor?:  Color | string;
    container?: HTMLElement;
    loadingOverlay?: HTMLElement;
    sidebar?: HTMLElement;
    extensions?: Extension;
}
*/
const configSchema = z
    .object({
        colors: z.optional(Colors),
        world: z.optional(
            z.object({
                startPosition: z.optional(z.array(z.number()).length(3)),
                centerOfWorld: z.optional(z.array(z.number()).length(3)),
            })
        ),
        container: z.optional(z.instanceof(HTMLElement)),
        loadingOverlay: z.optional(z.instanceof(HTMLElement)),
        sidebar: z.optional(
            z.object({
                body: z.optional(z.instanceof(HTMLElement)),
                visible: z.optional(z.boolean()),
            })
        ),
        extensions: z.optional(z.object({})),
    })
    .strict();

export { configSchema };

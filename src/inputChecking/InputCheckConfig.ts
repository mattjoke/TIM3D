import { Color } from "three";
import { z } from "zod";

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
        backgroundColor: z.optional(z.string().or(z.instanceof(Color))),
        container: z.optional(z.instanceof(HTMLElement)),
        loadingOverlay: z.optional(z.instanceof(HTMLElement)),
        sidebar: z.optional(z.instanceof(HTMLElement)),
        sidebarShown: z.optional(z.boolean()),
        extensions: z.optional(z.object({})),
    })
    .strict();

export { configSchema };

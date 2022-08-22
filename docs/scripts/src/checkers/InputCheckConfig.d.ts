import { Color } from 'three';
/**
 * Input template for Config
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
declare const configSchema: import("zod").ZodObject<{
    colors: import("zod").ZodOptional<import("zod").ZodObject<{
        backgroundColor: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodType<Color, import("zod").ZodTypeDef, Color>]>>;
        emissiveColor: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodType<Color, import("zod").ZodTypeDef, Color>]>>;
        selectionColor: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodType<Color, import("zod").ZodTypeDef, Color>]>>;
    }, "strip", import("zod").ZodTypeAny, {
        backgroundColor?: string | Color | undefined;
        emissiveColor?: string | Color | undefined;
        selectionColor?: string | Color | undefined;
    }, {
        backgroundColor?: string | Color | undefined;
        emissiveColor?: string | Color | undefined;
        selectionColor?: string | Color | undefined;
    }>>;
    world: import("zod").ZodOptional<import("zod").ZodObject<{
        startPosition: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        centerOfWorld: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        globalRotation: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        startPosition?: number[] | undefined;
        centerOfWorld?: number[] | undefined;
        globalRotation?: number[] | undefined;
    }, {
        startPosition?: number[] | undefined;
        centerOfWorld?: number[] | undefined;
        globalRotation?: number[] | undefined;
    }>>;
    container: import("zod").ZodOptional<import("zod").ZodType<HTMLElement, import("zod").ZodTypeDef, HTMLElement>>;
    loadingOverlay: import("zod").ZodOptional<import("zod").ZodType<HTMLElement, import("zod").ZodTypeDef, HTMLElement>>;
    sidebar: import("zod").ZodOptional<import("zod").ZodObject<{
        body: import("zod").ZodOptional<import("zod").ZodType<HTMLElement, import("zod").ZodTypeDef, HTMLElement>>;
        visible: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        body?: HTMLElement | undefined;
        visible?: boolean | undefined;
    }, {
        body?: HTMLElement | undefined;
        visible?: boolean | undefined;
    }>>;
    animationLoop: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    extensions: import("zod").ZodOptional<import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>>;
}, "strict", import("zod").ZodTypeAny, {
    colors?: {
        backgroundColor?: string | Color | undefined;
        emissiveColor?: string | Color | undefined;
        selectionColor?: string | Color | undefined;
    } | undefined;
    world?: {
        startPosition?: number[] | undefined;
        centerOfWorld?: number[] | undefined;
        globalRotation?: number[] | undefined;
    } | undefined;
    container?: HTMLElement | undefined;
    loadingOverlay?: HTMLElement | undefined;
    sidebar?: {
        body?: HTMLElement | undefined;
        visible?: boolean | undefined;
    } | undefined;
    animationLoop?: string[] | undefined;
    extensions?: {} | undefined;
}, {
    colors?: {
        backgroundColor?: string | Color | undefined;
        emissiveColor?: string | Color | undefined;
        selectionColor?: string | Color | undefined;
    } | undefined;
    world?: {
        startPosition?: number[] | undefined;
        centerOfWorld?: number[] | undefined;
        globalRotation?: number[] | undefined;
    } | undefined;
    container?: HTMLElement | undefined;
    loadingOverlay?: HTMLElement | undefined;
    sidebar?: {
        body?: HTMLElement | undefined;
        visible?: boolean | undefined;
    } | undefined;
    animationLoop?: string[] | undefined;
    extensions?: {} | undefined;
}>;
export { configSchema };

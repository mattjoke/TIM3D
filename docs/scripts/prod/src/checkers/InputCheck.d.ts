/**
 * Checks if input obejct is correct according to the template.
 * @author Matej Hakoš
 *
 * @param {object} object
 * @return {SafeParseReturnType}
 */
declare const ConfigCheck: (object: object) => import("zod").SafeParseReturnType<{
    colors?: {
        backgroundColor?: string | import("three").Color | undefined;
        emissiveColor?: string | import("three").Color | undefined;
        selectionColor?: string | import("three").Color | undefined;
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
        backgroundColor?: string | import("three").Color | undefined;
        emissiveColor?: string | import("three").Color | undefined;
        selectionColor?: string | import("three").Color | undefined;
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
/**
 * Checks if input obejct is correct according to the template.
 * @author Matej Hakoš
 *
 * @param {object} object
 * @return {SafeParseReturnType}
 */
declare const JsonCheck: (object: object) => import("zod").SafeParseReturnType<{
    files?: {
        color?: string | import("three").Color | undefined;
        name?: string | number | undefined;
        pose?: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        } | undefined;
        animation?: string | undefined;
        id: string;
        file: string;
    }[] | undefined;
    steps?: {
        name?: string | undefined;
        animation?: string | undefined;
        positions: {
            animation?: string | undefined;
            id: string | number;
            pose: {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            };
        }[];
    }[] | undefined;
}, {
    files?: {
        color?: string | import("three").Color | undefined;
        name?: string | number | undefined;
        pose?: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        } | undefined;
        animation?: string | undefined;
        id: string;
        file: string;
    }[] | undefined;
    steps?: {
        name?: string | undefined;
        animation?: string | undefined;
        positions: {
            animation?: string | undefined;
            id: string | number;
            pose: {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            };
        }[];
    }[] | undefined;
}>;
export { ConfigCheck, JsonCheck };

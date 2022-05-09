import { Color } from 'three';
/**
 * Strictly checks if input Files are corresponding with template.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
declare const fileSchema: import("zod").ZodObject<{
    id: import("zod").ZodString;
    name: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>>;
    file: import("zod").ZodString;
    color: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodType<Color, import("zod").ZodTypeDef, Color>]>>;
    pose: import("zod").ZodOptional<import("zod").ZodObject<{
        position: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        orientation: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        position?: number[] | undefined;
        orientation?: number[] | undefined;
    }, {
        position?: number[] | undefined;
        orientation?: number[] | undefined;
    }>>;
    animation: import("zod").ZodOptional<import("zod").ZodString>;
}, "strict", import("zod").ZodTypeAny, {
    id: string;
    name?: string | number | undefined;
    file: string;
    color?: string | Color | undefined;
    pose?: {
        position?: number[] | undefined;
        orientation?: number[] | undefined;
    } | undefined;
    animation?: string | undefined;
}, {
    id: string;
    name?: string | number | undefined;
    file: string;
    color?: string | Color | undefined;
    pose?: {
        position?: number[] | undefined;
        orientation?: number[] | undefined;
    } | undefined;
    animation?: string | undefined;
}>;
/**
 * Strictly checks if input Positions are corresponding with template.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
declare const positionSchema: import("zod").ZodObject<{
    id: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
    pose: import("zod").ZodObject<{
        position: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        orientation: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        position?: number[] | undefined;
        orientation?: number[] | undefined;
    }, {
        position?: number[] | undefined;
        orientation?: number[] | undefined;
    }>;
    animation: import("zod").ZodOptional<import("zod").ZodString>;
}, "strict", import("zod").ZodTypeAny, {
    id: string | number;
    pose: {
        position?: number[] | undefined;
        orientation?: number[] | undefined;
    };
    animation?: string | undefined;
}, {
    id: string | number;
    pose: {
        position?: number[] | undefined;
        orientation?: number[] | undefined;
    };
    animation?: string | undefined;
}>;
/**
 * Strictly checks if input Steps are corresponding with template.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
declare const stepSchema: import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    positions: import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
        pose: import("zod").ZodObject<{
            position: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
            orientation: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        }, {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        }>;
        animation: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strict", import("zod").ZodTypeAny, {
        id: string | number;
        pose: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        };
        animation?: string | undefined;
    }, {
        id: string | number;
        pose: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        };
        animation?: string | undefined;
    }>, "many">;
    animation: import("zod").ZodOptional<import("zod").ZodString>;
}, "strict", import("zod").ZodTypeAny, {
    name?: string | undefined;
    positions: {
        id: string | number;
        pose: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        };
        animation?: string | undefined;
    }[];
    animation?: string | undefined;
}, {
    name?: string | undefined;
    positions: {
        id: string | number;
        pose: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        };
        animation?: string | undefined;
    }[];
    animation?: string | undefined;
}>;
/**
 * Strictly checks if input JSON is corresponding with template.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
declare const jsonSchema: import("zod").ZodObject<{
    files: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodString;
        name: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>>;
        file: import("zod").ZodString;
        color: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodType<Color, import("zod").ZodTypeDef, Color>]>>;
        pose: import("zod").ZodOptional<import("zod").ZodObject<{
            position: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
            orientation: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        }, {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        }>>;
        animation: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strict", import("zod").ZodTypeAny, {
        id: string;
        name?: string | number | undefined;
        file: string;
        color?: string | Color | undefined;
        pose?: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        } | undefined;
        animation?: string | undefined;
    }, {
        id: string;
        name?: string | number | undefined;
        file: string;
        color?: string | Color | undefined;
        pose?: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        } | undefined;
        animation?: string | undefined;
    }>, "many">>;
    steps: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        positions: import("zod").ZodArray<import("zod").ZodObject<{
            id: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodNumber]>;
            pose: import("zod").ZodObject<{
                position: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
                orientation: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            }, {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            }>;
            animation: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strict", import("zod").ZodTypeAny, {
            id: string | number;
            pose: {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            };
            animation?: string | undefined;
        }, {
            id: string | number;
            pose: {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            };
            animation?: string | undefined;
        }>, "many">;
        animation: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strict", import("zod").ZodTypeAny, {
        name?: string | undefined;
        positions: {
            id: string | number;
            pose: {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            };
            animation?: string | undefined;
        }[];
        animation?: string | undefined;
    }, {
        name?: string | undefined;
        positions: {
            id: string | number;
            pose: {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            };
            animation?: string | undefined;
        }[];
        animation?: string | undefined;
    }>, "many">>;
}, "strict", import("zod").ZodTypeAny, {
    files?: {
        id: string;
        name?: string | number | undefined;
        file: string;
        color?: string | Color | undefined;
        pose?: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        } | undefined;
        animation?: string | undefined;
    }[] | undefined;
    steps?: {
        name?: string | undefined;
        positions: {
            id: string | number;
            pose: {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            };
            animation?: string | undefined;
        }[];
        animation?: string | undefined;
    }[] | undefined;
}, {
    files?: {
        id: string;
        name?: string | number | undefined;
        file: string;
        color?: string | Color | undefined;
        pose?: {
            position?: number[] | undefined;
            orientation?: number[] | undefined;
        } | undefined;
        animation?: string | undefined;
    }[] | undefined;
    steps?: {
        name?: string | undefined;
        positions: {
            id: string | number;
            pose: {
                position?: number[] | undefined;
                orientation?: number[] | undefined;
            };
            animation?: string | undefined;
        }[];
        animation?: string | undefined;
    }[] | undefined;
}>;
export { jsonSchema, fileSchema, stepSchema, positionSchema };

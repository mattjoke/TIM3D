import { ComputedPostions, ObjectID } from '../types/applicationTypes';
import { Color } from 'three';
/**
 * Checks if input is parsable color.
 * @author Matej Hakoš
 *
 * @param {(string | Color)} color
 * @return {boolean}
 */
declare const isColor: (color: string | Color) => boolean;
/**
 * Parse file extension from file path.
 * @author Matej Hakoš
 *
 * @deprecated
 * @param {ObjectID} filename
 * @return {string}
 */
declare const parseExtension: (filename: ObjectID) => string | undefined;
/**
 * Checks if document is already in fullscreen.
 * (Note: @ts-ignore is required because of unsupported types.)
 * @author Matej Hakoš
 *
 * @param {?Document} [document]
 * @return{boolean}
 */
declare const checkFullscreen: (document?: Document | undefined) => any;
/**
 * Generated (pseudo)random color.
 * @author Matej Hakoš
 *
 * @return {number}
 */
declare const generateRandomColor: () => number;
/**
 * Generates random color from list of known css colors.
 * @author Matej Hakoš
 *
 * @return {string}
 */
declare const generateRandomSeededColor: () => string;
/**
 * Creates a deep copy of Map.
 *
 * @param {ComputedPostions} obj
 * @return {ComputedPostions}
 */
declare const deepCopyMap: (obj: ComputedPostions) => ComputedPostions;
export { isColor, parseExtension, checkFullscreen, deepCopyMap, generateRandomColor, generateRandomSeededColor };

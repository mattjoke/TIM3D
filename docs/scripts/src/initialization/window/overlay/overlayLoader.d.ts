import '../overlay/overlay.css';
import { Sidebar } from '../../../types/configTypes';
import { Stepper } from 'initialization/Stepper';
/**
 * Loads a handlebars template, renders it and initializes appropriate callbacks.
 *
 * @param {Stepper} stepper A Stepper instance.
 * @param {string} parentUUID UUID of current instance.
 * @param {?Sidebar} [sidebar] Optional sidebar to render.
 * @return {HTMLDivElement} A div with rendered data.
 */
declare const Loader: (stepper: Stepper, parentUUID: string, sidebar?: Sidebar) => HTMLDivElement;
export { Loader as overlayLoader };

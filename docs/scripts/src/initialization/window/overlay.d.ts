import { Sidebar } from '../../types/configTypes';
import { Stepper } from '../Stepper';
import { Window } from '../Window';
/**
 * Loads overlay, adds fullscreen and reset callbacks
 * @author Matej Hakoš
 *
 * @param {Stepper} stepper
 * @param {Window} window
 * @param {string} parentUUID
 * @param {?Sidebar} [customSidebar]
 * @return {HTMLDivElement}
 */
declare const overlay: (stepper: Stepper, window: Window, parentUUID: string, customSidebar?: Sidebar) => HTMLDivElement;
export { overlay };

import { elementSizing } from '../../types/applicationTypes';
/**
 * Instance of a HTML container, which is rendered to page.
 * @author Matej Hakoš
 *
 * @class Container
 * @typedef {Container}
 */
declare class Container {
    /**
     * Current instance drawn to page.
     *
     * @private
     * @type {HTMLElement}
     */
    private instance;
    /**
     * Creates an instance of Container.
     *
     * @constructor
     * @param {?HTMLElement} [container] Programatically predefined (optional) container.
     */
    constructor(container?: HTMLElement);
    /**
     * Returns current instance.
     *
     * @public
     * @return {HTMLElement}
     */
    getInstance(): HTMLElement;
    /**
     * Destroys current instance.
     *
     * @public
     */
    destroy(): void;
    /**
     * Returns current sizing of element.
     *
     * @public
     * @return {elementSizing}
     */
    getSizing(): elementSizing;
    /**
     * Appends a DOM element to instance.
     *
     * @public
     * @param {HTMLElement} domElement
     */
    appendChild(domElement: HTMLElement): void;
    /**
     * Removes DOM element from instance.
     *
     * @public
     * @param {HTMLElement} domElement
     */
    removeChild(domElement: HTMLElement): void;
}
export { Container };

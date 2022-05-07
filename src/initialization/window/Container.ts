import { elementSizing } from '../../types/applicationTypes';

/**
 * Instance of a HTML container, which is rendered to page.
 * @author Matej Hakoš
 *
 * @class Container
 * @typedef {Container}
 */
class Container {
  /**
   * Current instance drawn to page.
   *
   * @private
   * @type {HTMLElement}
   */
  private instance: HTMLElement;

  /**
   * Creates an instance of Container.
   *
   * @constructor
   * @param {?HTMLElement} [container] Programatically predefined (optional) container.
   */
  constructor(container?: HTMLElement) {
    if (container == null) {
      this.instance = document.createElement('div');
      this.instance.id = 'container';
      document.body.appendChild(this.instance);
      console.warn(
        'Container not specified! Appending to the body. Consider specifying default container.'
      );
    } else {
      this.instance = container;
    }

    this.instance.style.backgroundColor = 'blue';
    this.instance.style.position = 'relative';
  }

  /**
   * Returns current instance.
   *
   * @public
   * @return {HTMLElement}
   */
  public getInstance() {
    return this.instance;
  }

  /**
   * Destroys current instance.
   *
   * @public
   */
  public destroy() {
    this.instance.remove();
  }

  /**
   * Returns current sizing of element.
   *
   * @public
   * @return {elementSizing}
   */
  public getSizing(): elementSizing {
    return {
      width: this.instance.offsetWidth,
      height: this.instance.offsetHeight
    };
  }

  /**
   * Appends a DOM element to instance.
   *
   * @public
   * @param {HTMLElement} domElement
   */
  public appendChild(domElement: HTMLElement) {
    this.instance.appendChild(domElement);
  }

  /**
   * Removes DOM element from instance.
   *
   * @public
   * @param {HTMLElement} domElement
   */
  public removeChild(domElement: HTMLElement) {
    this.instance.removeChild(domElement);
  }
}

export { Container };

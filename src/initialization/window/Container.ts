import { number } from "zod";

/**
 * Description placeholder
 * @date 3/4/2022 - 11:06:01 AM
 *
 * @class WindowsContainer
 * @typedef {WindowsContainer}
 */
class WindowsContainer {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {HTMLElement}
   */
  private instance: HTMLElement;

  /**
   * Creates an instance of WindowsContainer.
   * @date 3/4/2022 - 11:06:07 AM
   *
   * @constructor
   * @param {?HTMLElement} [container]
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
   * Description placeholder
   * @date 3/4/2022 - 11:06:13 AM
   *
   * @public
   * @return {*}
   */
  public getInstance() {
    return this.instance;
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 11:06:17 AM
   *
   * @public
   */
  public destroy() {
    this.instance.remove();
  }

  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @public
   * @returns {{width:number; height:number}}
   */
  public getSizing() : {width:number; height:number} {
    return {
      width: this.instance.offsetWidth,
      height: this.instance.offsetHeight
    };
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 11:06:37 AM
   *
   * @public
   * @param {HTMLElement} domElement
   */
  public appendChild(domElement: HTMLElement) {
    this.instance.appendChild(domElement);
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 11:06:41 AM
   *
   * @public
   * @param {HTMLElement} domElement
   */
  public removeChild(domElement: HTMLElement) {
    this.instance.removeChild(domElement);
  }
}

export default WindowsContainer;

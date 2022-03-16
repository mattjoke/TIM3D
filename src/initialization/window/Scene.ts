import { AxesHelper, Color, Object3D, Scene as ThreeScene } from 'three';

import { isColor } from '../../stuff/Utils';

/**
 * Wrapper over Three.js's Scene.
 * @author Matej Hakoš
 *
 * @class Scene
 * @typedef {Scene}
 */
class Scene {
  /**
   * Three.js instance of Scene.
   *
   * @private
   * @type {ThreeScene}
   */
  private instance: ThreeScene;

  /**
   * Creates an instance of Scene.
   *
   * @constructor
   * @param {?(Color | string)} [backgroundColor]
   */
  constructor(backgroundColor?: Color | string) {
    this.instance = new ThreeScene();

    if (backgroundColor == null) {
      this.instance.background = new Color('#ede7e6');
    } else if (
      typeof backgroundColor === 'string' &&
      !isColor(backgroundColor)
    ) {
      this.instance.background = new Color('#ede7e6');
      console.warn('Cannot parse unknown color:', backgroundColor);
    } else {
      this.instance.background = new Color(backgroundColor);
    }
    this.initAxexHelper();
  }

  /**
   * Initializes axes helper (for debug).
   *
   * @private
   */
  private initAxexHelper() {
    const axes = new AxesHelper(100);
    axes.position.set(0, 0, 0);
    axes.rotateY(Math.PI / 2);
    axes.layers.set(3);

    this.instance.add(axes);
  }

  /**
   * Returns instance of Three.js Scene.
   *
   * @public
   * @return {ThreeScene}
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
    this.instance.clear();
  }

  /**
   * Removes all children in the scene
   *
   * @public
   */
  public clear() {
    this.instance.clear();
  }

  /**
   * Adds object/s to the Scene.
   *
   * @public
   * @param {...Object3D[]} objects
   */
  public addObject(...objects: Object3D[]) {
    objects.forEach((object) => {
      this.instance.add(object);
    });
  }
}

export { Scene };

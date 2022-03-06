import { AxesHelper, Color, Object3D, Scene as ThreeScene } from 'three';

import { isColor } from '../../stuff/Utils';

/**
 * Description placeholder
 * @date 3/4/2022 - 12:19:22 PM
 * @author Matej Hakoš
 *
 * @class Scene
 * @typedef {Scene}
 */
class Scene {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {ThreeScene}
   */
  private instance: ThreeScene;

  /**
   * Creates an instance of Scene.
   * @date 3/4/2022 - 12:19:30 PM
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
   * Description placeholder
   * @date 3/4/2022 - 12:19:42 PM
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
   * Description placeholder
   * @date 3/4/2022 - 12:19:47 PM
   *
   * @public
   * @return {*}
   */
  public getInstance() {
    return this.instance;
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:20:08 PM
   *
   * @public
   */
  public destroy() {
    this.instance.clear();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:20:17 PM
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

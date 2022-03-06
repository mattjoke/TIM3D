import { Camera, Vector3 } from 'three';
import { Easing, Tween } from '@tweenjs/tween.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {Renderer} from './Renderer';

/**
 * Description placeholder
 * @date 3/4/2022 - 11:08:16 AM
 *
 * @class OrbitalControls
 * @typedef {OrbitalControls}
 */
class OrbitalControls {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {OrbitControls}
   */
  private controls: OrbitControls;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {Camera}
   */
  private camera: Camera;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {*}
   */
  private startingPosition = new Vector3(100, 100, 110);
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {*}
   */
  private worldPosition = new Vector3(0, 0, 0);

  /**
   * Creates an instance of OrbitalControls.
   * @date 3/4/2022 - 11:08:16 AM
   *
   * @constructor
   * @param {Camera} camera
   * @param {Renderer} renderer
   */
  constructor(camera: Camera, renderer: Renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = -Infinity;

    this.controls.addEventListener('start', () => {
      renderer.lockHighlight();
    });
    this.controls.addEventListener('end', () => {
      renderer.unlockHightlight();
    });

    this.camera = camera;
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 11:08:16 AM
   *
   * @public
   * @param {Vector3} position
   */
  public setStartingPosition(position: Vector3) {
    this.startingPosition = position;
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 11:08:16 AM
   *
   * @public
   * @param {Vector3} worldPosition
   */
  public setWorldPosition(worldPosition: Vector3) {
    this.worldPosition = worldPosition;
    this.controls.target.set(worldPosition.x, worldPosition.y, worldPosition.z);
    this.controls.target.normalize();
    this.reset();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 11:08:16 AM
   *
   * @public
   */
  public destroy() {
    this.controls.dispose();
    this.camera.clear();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 11:08:16 AM
   *
   * @public
   */
  public update() {
    this.controls.update();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 11:08:16 AM
   *
   * @public
   */
  public reset() {
    this.controls.enableDamping = false;
    new Tween(this.camera.position)
      .to(this.startingPosition, 500)
      .easing(Easing.Quadratic.Out)
      .start();
    new Tween(this.controls.target)
      .to(this.worldPosition, 500)
      .easing(Easing.Quadratic.Out)
      .start()
      .onComplete((_) => {
        this.controls.enableDamping = true;
      });
  }
}

export {OrbitalControls};

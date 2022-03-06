import { Camera, Vector3 } from 'three';
import { Easing, Tween } from '@tweenjs/tween.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Renderer } from './Renderer';

/**
 * Class that initializes Three.js's OrbitControls and handles user interaction.
 * @author Matej Hakoš
 *
 * @class OrbitalControls
 * @typedef {OrbitalControls}
 */
class OrbitalControls {
  /**
   * Current instance of OrbitControls.
   *
   * @private
   * @type {OrbitControls}
   */
  private controls: OrbitControls;
  /**
   * Current instance of Camera.
   *
   * @private
   * @type {Camera}
   */
  private camera: Camera;
  /**
   * Starting camera/controls postion.
   *
   * @private
   * @type {Vector3}
   */
  private startingPosition = new Vector3(100, 100, 110);
  /**
   * Focus point of OrbitControls.
   *
   * @private
   * @type {Vector3}
   */
  private worldPosition = new Vector3(0, 0, 0);

  /**
   * Creates an instance of OrbitalControls.
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
   * Sets starting postion of camera.
   *
   * @public
   * @param {Vector3} position
   */
  public setStartingPosition(position: Vector3) {
    this.startingPosition = position;
  }

  /**
   * Sets starting focus point for controls.
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
   * Destroys instances.
   *
   * @public
   */
  public destroy() {
    this.controls.dispose();
    this.camera.clear();
  }

  /**
   * Manually updates controls (important for easing).
   *
   * @public
   */
  public update() {
    this.controls.update();
  }

  /**
   * Resets current control postion to predefined position (animated).
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

export { OrbitalControls };

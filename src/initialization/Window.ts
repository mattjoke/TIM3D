import { Config } from '../types/configTypes';
import { Container } from './window/Container';
import { OrbitalControls } from './window/OrbitalControls';
import { Renderer } from './window/Renderer';
import { Scene } from './window/Scene';
import { Vector3 } from 'three';
import { camera } from './window/camera';
import { update } from '@tweenjs/tween.js';

/**
 * Class that handles rendering and handleing animating.
 * @author Matej Hakoš
 *
 * @class Window
 * @typedef {Window}
 */
class Window {
  /**
   * Instance of scene.
   *
   * @public
   * @type {Scene}
   */
  public scene: Scene;
  /**
   * Instance of renderer.
   *
   * @private
   * @type {Renderer}
   */
  private renderer: Renderer;
  /**
   * Instance of Camera.
   *
   * @private
   * @type {*}
   */
  private camera;
  /**
   * Instance of HTML Container.
   *
   * @public
   * @type {Container}
   */
  public container: Container;
  /**
   * Instance of OrbitalControls.
   *
   * @private
   * @type {OrbitalControls}
   */
  private orbitalControls: OrbitalControls;

  /**
   * Creates an instance of Window.
   *
   * @constructor
   * @param {Config} config
   */
  constructor(config: Config) {
    this.container = new Container(config.container);

    this.scene = new Scene(config.colors?.backgroundColor);

    const startPosition = config.world?.startPosition
      ? new Vector3().fromArray(config.world.startPosition)
      : new Vector3(100, 100, 110);

    this.camera = camera(window.innerWidth / window.innerHeight, startPosition);

    this.renderer = new Renderer(
      this.container.getSizing(),
      this.scene.getInstance(),
      this.camera,
      config.colors
    );

    this.container.appendChild(this.renderer.domElement);

    // Orbital controls
    this.orbitalControls = new OrbitalControls(this.camera, this.renderer);

    this.orbitalControls.setStartingPosition(startPosition);

    const worldPosition = config.world?.centerOfWorld
      ? new Vector3().fromArray(config.world.centerOfWorld)
      : new Vector3(0, 0, 0);
    this.orbitalControls.setWorldPosition(worldPosition);

    this.animate();
  }

  /**
   * Resets camera to starting postion.
   *
   * @public
   */
  public resetCamera() {
    this.orbitalControls.reset();
  }

  /**
   * Returns current instance of camera.
   *
   * @public
   * @return {Camera}
   */
  public getCamera() {
    return this.camera;
  }

  /**
   * Returns current instance of Scene.
   *
   * @public
   * @return {Scene}
   */
  public getScene() {
    return this.scene;
  }

  /**
   * Returns current instance of container.
   *
   * @public
   * @return {*}
   */
  public getContainer() {
    return this.container.getInstance();
  }

  /**
   * Destroys this instance.
   *
   * @public
   */
  public destroy() {
    this.scene.destroy();
    this.renderer.destroy();
    this.camera.clear();
    this.container.destroy();
    this.orbitalControls.destroy();
  }

  /**
   * Callback which handles sizing issues while resizing of the window.
   *
   * @private
   */
  private onWindowResize() {
    const sizing = this.container.getSizing();
    this.camera.aspect = sizing.width / sizing.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(sizing);
  }

  /**
   * Renders animations, updates renderer.
   * Possible pause of animations/rendering.
   *
   * @public
   */
  public animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.onWindowResize();

    this.orbitalControls.update();

    this.renderer.render(this.scene.getInstance(), this.camera);

    update();
  }
}

export { Window };

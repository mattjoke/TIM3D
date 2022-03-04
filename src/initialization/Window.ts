import Camera from './window/Camera';
import { Config } from '@manualTypes/configTypes';
import Container from './window/Container';
import OrbitalControls from './window/OrbitalControls';
import Renderer from './window/Renderer';
import Scene from './window/Scene';
import { Vector3 } from 'three';
import { update } from '@tweenjs/tween.js';

/**
 * Description placeholder
 * @date 3/4/2022 - 12:26:02 PM
 *
 * @class Window
 * @typedef {Window}
 */
class Window {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @public
   * @type {Scene}
   */
  public scene: Scene;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {Renderer}
   */
  private renderer: Renderer;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {*}
   */
  private camera;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @public
   * @type {Container}
   */
  public container: Container;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {OrbitalControls}
   */
  private orbitalControls: OrbitalControls;

  
  /**
   * Creates an instance of Window.
   * @date 3/4/2022 - 12:26:09 PM
   * @author Matej Hakoš
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

    this.camera = Camera(window.innerWidth / window.innerHeight, startPosition);

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
   * Description placeholder
   * @date 3/4/2022 - 12:26:14 PM
   * @author Matej Hakoš
   *
   * @public
   */
  public resetCamera() {
    this.orbitalControls.reset();
  }
  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:26:18 PM
   * @author Matej Hakoš
   *
   * @public
   * @return {*}
   */
  public getCamera() {
    return this.camera;
  }
  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:26:22 PM
   * @author Matej Hakoš
   *
   * @public
   * @return {Scene}
   */
  public getScene() {
    return this.scene;
  }
  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:26:25 PM
   * @author Matej Hakoš
   *
   * @public
   * @return {*}
   */
  public getContainer() {
    return this.container.getInstance();
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:26:33 PM
   * @author Matej Hakoš
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
   * Description placeholder
   * @date 3/4/2022 - 12:26:37 PM
   * @author Matej Hakoš
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
   * Description placeholder
   * @date 3/4/2022 - 12:26:40 PM
   * @author Matej Hakoš
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

export default Window;

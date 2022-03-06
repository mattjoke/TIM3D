import { ConfigCheck, JsonCheck } from '../inputChecking/InputCheck';
import { Line, Object3D } from 'three';
import { ObjectID, Objects3D } from '../types/applicationTypes';

import Axis from './init/Axis';
import { Config } from '../types/configTypes';
import { JSON } from '../types/jsonTypes';
import Loader from '../stuff/Loader';
import Overlay from './window/Overlay';
import PlaneInit from './init/PlaneInit';
import Stepper from './Stepper';
import Window from './Window';

/**
 * Description placeholder
 * @date 3/4/2022 - 12:22:17 PM
 * @author Matej Hakoš
 *
 * @class Init
 * @typedef {Init}
 */
class Init {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {Window}
   */
  private window: Window;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {HTMLDivElement}
   */
  private overlay: HTMLDivElement;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {(Stepper | undefined)}
   */
  private stepper: Stepper | undefined;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {Objects3D}
   */
  private objects: Objects3D;

  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {string}
   */
  private parentUUID: string;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {Config}
   */
  private config: Config;

  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @public
   * @type {boolean}
   */
  public objectsLoaded = false;

  
  /**
   * Creates an instance of Init.
   * @date 3/4/2022 - 12:22:30 PM
   *
   * @constructor
   * @param {Config} config
   * @param {string} uuid
   */
  constructor(config: Config, uuid: string) {
    this.checker(config, ConfigCheck);
    this.config = config;
    this.parentUUID = uuid;

    this.objects = new Map();
    this.window = new Window(config);
    this.initPlane();
    this.initAxes();
    this.overlay = document.createElement('div');

    // Run the animations
    this.window.animate();
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:22:35 PM
   *
   * @public
   */
  public initPlane() {
    const [light, ambient] = PlaneInit();
    this.addObjects(light, ambient);
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:22:39 PM
   *
   * @private
   */
  private initAxes() {
    const init = Axis(1.0);
    init.forEach((axis: Line) => {
      this.addObjects(axis);
    });
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:22:42 PM
   *
   * @public
   * @param {JSON} json
   */
  public withJSON(json: JSON) {
    this.objectsLoaded = false;
    this.checker(json, JsonCheck);

    Loader(json.files ?? [], this.window, this.config).then((items) => {
      this.objects = items;
      this.objectsLoaded = this.objects.size > 0;

      this.stepper = new Stepper(
        json,
        this.objects.get.bind(this.objects),
        this.config.animationLoop
      );

      this.overlay = Overlay(
        this.stepper,
        this.window,
        this.parentUUID,
        this.config.sidebar
      );
      this.window.container.appendChild(this.overlay);
    });
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:23:02 PM
   *
   * @private
   * @param {object} object
   * @param {(typeof JsonCheck | typeof ConfigCheck)} checker
   * @return {boolean}
   */
  private checker(
    object: object,
    checker: typeof JsonCheck | typeof ConfigCheck
  ) {
    const check = checker(object);
    if (!check.success) {
      check.error.issues.forEach((issue) => {
        throw new SyntaxError(`${this.parentUUID}-${issue.message}`);
      });
    }

    return check.success;
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:23:14 PM
   *
   * @public
   * @return {*}
   */
  public getStepper() {
    return this.stepper;
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:23:19 PM
   *
   * @private
   * @param {number} t
   * @return {*}
   */
  private delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:23:24 PM
   *
   * @public
   * @async
   * @return {unknown}
   */
  public async getItems() {
    while (!this.objectsLoaded) {
      await this.delay(100);
    }
    return this.objects;
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:23:30 PM
   *
   * @public
   * @async
   * @param {ObjectID} selector
   * @return {unknown}
   */
  public async getItem(selector: ObjectID) {
    return Promise.resolve(
      this.getItems().then((objects) => {
        const object = objects.get(selector);
        if (object == null) {
          return;
        }
        return object;
      })
    );
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:23:36 PM
   *
   * @public
   * @param {...*} objects
   */
  public addObjects(...objects: any) {
    objects.forEach((obj: Object3D) => {
      this.window.getScene().addObject(obj);
    });
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:23:41 PM
   *
   * @public
   * @param {number} stepNumber
   */
  public setStep(stepNumber: number) {
    const currStep = this.stepper?.setStep(stepNumber);
    this.overlay.dispatchEvent(new CustomEvent('update', { detail: currStep }));
  }

  
  /**
   * Description placeholder
   * @date 3/4/2022 - 12:23:50 PM
   *
   * @public
   */
  public destroy() {
    this.window.destroy();
    this.overlay.remove();
    this.stepper?.destroy();
    this.objects.clear();
    this.objectsLoaded = false;
  }
}

export default Init;

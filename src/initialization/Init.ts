import { ConfigCheck, JsonCheck } from '../inputChecking/InputCheck';
import { Line, Object3D } from 'three';
import { ObjectID, Objects3D } from '../types/applicationTypes';

import { Config } from '../types/configTypes';
import { JSON } from '../types/jsonTypes';
import { Stepper } from './Stepper';
import { Window } from './Window';
import { axis } from './init/axis';
import { loader } from '../stuff/loader';
import { overlay } from './window/overlay';
import { planeInit } from './init/planeInit';

/**
 * Initialization class, handles all important classes.
 * @author Matej Hakoš
 *
 * @class Init
 * @typedef {Init}
 */
class Init {
  /**
   * A Window instance, which handles Scene and Renderer.
   *
   * @private
   * @type {Window}
   */
  private window: Window;
  /**
   * An overlay HTML Div element.
   *
   * @private
   * @type {HTMLDivElement}
   */
  private overlay: HTMLDivElement;
  /**
   * A Stepper instance.
   *
   * @private
   * @type {(Stepper | undefined)}
   */
  private stepper: Stepper | undefined;
  /**
   * Map which contains all loaded and drawn objects.
   *
   * @private
   * @type {Objects3D}
   */
  private objects: Objects3D;

  /**
   * Unique ID of instance.
   *
   * @private
   * @type {string}
   */
  private parentUUID: string;
  /**
   * Current loaded and parsed config.
   *
   * @private
   * @type {Config}
   */
  private config: Config;

  /**
   * Boolean, which signalizes, if objects are successfully loaded.
   *
   * @public
   * @type {boolean}
   */
  public objectsLoaded = false;

  /**
   * Creates an instance of Init.
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
   * Calls planeInit and initializes lights.
   *
   * @public
   */
  public initPlane() {
    const [light, ambient] = planeInit();
    this.addObjects(light, ambient);
  }

  /**
   * Initializes axes.
   *
   * @private
   */
  private initAxes() {
    const init = axis(1.0);
    init.forEach((axis: Line) => {
      this.addObjects(axis);
    });
  }

  /**
   * Async function, which takes JSON as input, checks it, parses it and loads all files.
   *
   * @public
   * @param {JSON} json
   */
  public withJSON(json: JSON) {
    this.objectsLoaded = false;
    this.checker(json, JsonCheck);

    loader(json.files ?? [], this.window, this.config).then((items) => {
      this.objects = items;
      this.objectsLoaded = this.objects.size > 0;

      this.stepper = new Stepper(
        json,
        this.objects.get.bind(this.objects),
        this.config.animationLoop
      );

      this.overlay = overlay(
        this.stepper,
        this.window,
        this.parentUUID,
        this.config.sidebar
      );
      this.window.container.appendChild(this.overlay);
    });
  }

  /**
   * Check input object for patter matching and input sanitization.
   *
   * @private
   * @param {object} object
   * @param {JsonCheck | ConfigCheck} checker
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
   * Returns this instace of Stepper.
   *
   * @public
   * @return {Stepper}
   */
  public getStepper() {
    return this.stepper;
  }

  /**
   * Returns a new promise and resolves it after t miliseconds.
   *
   * @private
   * @param {number} t
   * @return {Promise}
   */
  private delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  /**
   * Asynchronously returns items.
   *
   * @public
   * @async
   * @return {Objects3D}
   */
  public async getItems() {
    while (!this.objectsLoaded) {
      await this.delay(100);
    }
    return this.objects;
  }

  /**
   * Asynchronously finds and item and returns it.
   *
   * @public
   * @async
   * @param {ObjectID} selector
   * @return {Object3D}
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
   * Adds objects to rendering Scene.
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
   * Sets Stepper's step programatically.
   *
   * @public
   * @param {number} stepNumber
   */
  public setStep(stepNumber: number) {
    const currStep = this.stepper?.setStep(stepNumber);
    this.overlay.dispatchEvent(new CustomEvent('update', { detail: currStep }));
  }

  /**
   * Destorys this instance.
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

export { Init };

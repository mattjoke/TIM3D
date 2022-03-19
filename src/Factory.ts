import {
  AnimationDef,
  CallbackFunction,
  CameraCallback,
  CameraView,
  ObjectID,
  Objects3D,
  UUID
} from './types/applicationTypes';

import { AnimationStorage } from './initialization/stepper/AnimationStorage';
import { Config } from './types/configTypes';
import { Event } from 'three';
import { Init } from './initialization/Init';
import { JSON } from './types/jsonTypes';
import { Object3D } from 'stuff/Object3D';
import { v4 as uuidv4 } from 'uuid';

/**
 * Factory of instance.
 * @author Matej Hakoš
 *
 * @class Factory
 * @module Factory
 * @typedef {Factory}
 */
class Factory {
  /**
   * Returns an instance of an Init
   * @author Matej Hakoš
   *
   * @private
   * @type {(Init | null)}
   */
  private instance: Init | null;
  /**
   * Returns if objects are already loaded to the scene
   * @author Matej Hakoš
   *
   * @public
   * @type {boolean}
   */
  public objectsLoaded = false;
  /**
   * UUID of instance.
   * @author Matej Hakoš
   *
   * @private
   * @type {UUID}
   */
  private uuid: UUID;

  /**
   * Number of instances currently live.
   * @author Matej Hakoš
   *
   * @static
   * @type {number}
   */
  static instanceCounter = 0;

  /**
   * Creates an instance of Factory.
   *
   * @constructor
   * @param {?Config} [config]
   */
  constructor(config?: Config) {
    if (config == null) throw new Error('Config not specified!');
    Factory.instanceCounter = Math.max(Factory.instanceCounter, 0) + 1;
    this.uuid = this.generateUUID();
    this.instance = new Init(config, this.uuid);
    return this;
  }

  /**
   * Generated UUID for this instance.
   *
   * @private
   * @return {UUID}
   */
  private generateUUID() {
    let uuid = uuidv4();
    uuid = uuid.replace(/-/g, '');
    uuid = `tw-${uuid}`;

    console.log(
      'Factory instance:',
      Factory.instanceCounter,
      ' with uuid: ' + uuid
    );
    return uuid;
  }

  /**
   * Loads input JSON file.
   *
   * @public
   * @param {JSON} json
   * @return {this}
   */
  public loadJSON(json: JSON) {
    this.instance?.withJSON(json);
    this.objectsLoaded = true;
    return this;
  }

  /**
   * Destroys this instance.
   *
   * @public
   */
  public destroy() {
    this.instance?.destroy();
    this.objectsLoaded = false;
    this.instance = null;
  }

  /**
   * Returns item based on its id.
   *
   * @public
   * @param {ObjectID} id
   * @return {Object3D|undefined}
   */
  public getItem(id: ObjectID) {
    return this.instance?.getItem(id);
  }

  /**
   * Selects item in scene. (Same as double click on the item).
   *
   * @public
   * @param {ObjectID} id
   */
  public selectItem(id: ObjectID) {
    const obj = this.instance?.getItem(id);
    obj?.then((res) => {
      const outline = res?.getOutline();
      outline?.layers.toggle(0);
      res?.getMesh().dispatchEvent({ type: 'click', data: res });
    });
  }

  /**
   * Manually moves stepper to the specified step.
   *
   * @public
   * @param {number} stepNumber
   */
  public moveToStep(stepNumber: number) {
    this.instance?.setStep(stepNumber);
  }

  /**
   * Returns all the obejcts loaded into scene.
   *
   * @public
   * @return {Objects3D}
   */
  public getObjects() {
    return this.instance?.getItems().then((result: Objects3D) => {
      return result;
    });
  }

  /**
   * Sets scaling for ALL objects in the scene.
   *
   * @public
   * @param {number} scaling
   */
  public setScaling(scaling: number) {
    this.getObjects()?.then((data: Objects3D) => {
      data.forEach((object) => {
        object.setScale(scaling, scaling, scaling);
      });
    });
  }

  /**
   * Adds a callback to selector object.
   *
   * @public
   * @param {ObjectID} selector
   * @param {string} event
   * @param {CallbackFunction} callback
   */
  public on(selector: ObjectID, event: string, callback: CallbackFunction) {
    this.instance?.getItems()?.then((res) => {
      const item = res.get(selector);
      if (item == null) {
        return;
      }
      item.getMesh().addEventListener(event, (e: Event) => {
        callback(item, e);
      });
    });
  }

  /**
   * Adds a callback to all loaded objects.
   *
   * @public
   * @param {string} event
   * @param {CallbackFunction} callback
   */
  public group(event: string, callback: CallbackFunction) {
    this.instance?.getItems().then((objects: Objects3D) => {
      objects.forEach((item: Object3D) => {
        item.getMesh().addEventListener(event, (e) => {
          callback(item, e);
        });
      });
    });
  }

  /**
   * Returns animation from AnimationStorage.
   *
   * @public
   * @param {string} animationName
   * @return {AnimationDef|undefined}
   */
  public getAnimation(animationName: string) {
    return AnimationStorage.getAnimation(animationName);
  }

  /**
   * Returns all animations in AnimationStorage.
   *
   * @public
   * @return {Animations}
   */
  public getAnimations() {
    return AnimationStorage.getAnimations();
  }

  /**
   * Adds an animation to AnimationStorage.
   *
   * @public
   * @param {string} animationName
   * @param {AnimationDef} animtaion
   */
  public addAdnimation(animationName: string, animtaion: AnimationDef) {
    AnimationStorage.addAnimation(animationName, animtaion);
  }

  /**
   * Removes an animation from AnimationStorage.
   *
   * @public
   * @param {string} animationName
   */
  public removeAnimation(animationName: string) {
    AnimationStorage.removeAnimation(animationName);
  }

  /**
   * Sets an alias for the animation.
   *
   * @public
   * @param {string} animationName
   * @param {string} aliasName
   */
  public aliasAnimation(animationName: string, aliasName: string) {
    AnimationStorage.setAlias(animationName, aliasName);
  }

  /**
   * Pauses rendering of the Instance.
   *
   * @public
   */
  public pauseRendering() {
    this.instance?.pauseRendering();
  }
  /**
   * Resumes rendering of the Instance.
   *
   * @public
   */
  public resumeRendering() {
    this.instance?.resumeRendering();
  }

  /**
   * Returns current instance of camera.
   *
   * @public
   */
  public getCamera() {
    this.instance?.getCamera();
  }

  /**
   * Updates camera with function.
   *
   * @param {CameraCallback} callback
   */
  public updateCamera(callback: CameraCallback) {
    const camera = this.getCamera();
    if (camera != null) {
      callback(camera);
    }
  }

  /**
   * Sets camera to predefined view.
   *
   * @public
   * @param {?CameraView} [view]
   * @param {?string} [viewString]
   */
  public setView(view?: CameraView) {
    if (view != null) {
      this.instance?.setView(view);
    }
  }
}

export { Factory };

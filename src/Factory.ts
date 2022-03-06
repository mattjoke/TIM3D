import {
  AnimationDef,
  CallbackFunction,
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
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {(Init | null)}
   */
  private instance: Init | null;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @public
   * @type {boolean}
   */
  public objectsLoaded = false;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {UUID}
   */
  private uuid: UUID;

  /**
   * Description placeholder
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
   * Description placeholder
   *
   * @private
   * @return {*}
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
   * Description placeholder
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
   * Description placeholder
   *
   * @public
   */
  public destroy() {
    this.instance?.destroy();
    this.objectsLoaded = false;
    this.instance = null;
  }

  /**
   * Description placeholder
   *
   * @public
   * @param {ObjectID} id
   * @return {*}
   */
  public getItem(id: ObjectID) {
    return this.instance?.getItem(id);
  }

  /**
   * Description placeholder
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
   * Description placeholder
   *
   * @public
   * @param {number} stepNumber
   */
  public moveToStep(stepNumber: number) {
    this.instance?.setStep(stepNumber);
  }

  /**
   * Description placeholder
   *
   * @public
   * @return {*}
   */
  public getObjects() {
    return this.instance?.getItems().then((result: Objects3D) => {
      return result;
    });
  }

  /**
   * Description placeholder
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

  // Listeners functions

  /**
   * Description placeholder
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
   * Description placeholder
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

  // Animation functions

  /**
   * Description placeholder
   *
   * @public
   * @param {string} animationName
   * @return {*}
   */
  public getAnimation(animationName: string) {
    return AnimationStorage.getAnimation(animationName);
  }

  /**
   * Description placeholder
   *
   * @public
   * @return {*}
   */
  public getAnimations() {
    return AnimationStorage.getAnimations();
  }

  /**
   * Description placeholder
   *
   * @public
   * @param {string} animationName
   * @param {AnimationDef} animtaion
   */
  public addAdnimation(animationName: string, animtaion: AnimationDef) {
    AnimationStorage.addAnimation(animationName, animtaion);
  }

  /**
   * Description placeholder
   *
   * @public
   * @param {string} animationName
   */
  public removeAnimation(animationName: string) {
    AnimationStorage.removeAnimation(animationName);
  }

  /**
   * Description placeholder
   *
   * @public
   * @param {string} animationName
   * @param {string} aliasName
   */
  public aliasAnimation(animationName: string, aliasName: string) {
    AnimationStorage.setAlias(animationName, aliasName);
  }
}

export { Factory };

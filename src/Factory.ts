import { Event } from "three";
import Init from "./initialization/Init";
import AnimationStorage from "./initialization/stepper/AnimationStorage";
import { CallbackFunction, ObjectID } from "./types/applicationTypes";
import { Config } from "./types/configTypes";
import { JSON } from "./types/jsonTypes";

class Factory {
    private instance: Init | null;
    public objectsLoaded = false;

    constructor(config?: Config) {
        if (config == null) throw new Error("Config not specified!");
        this.instance = new Init(config);
        return this;
    }
    public async loadJSON(json: JSON) {
        await this.instance?.withJSON(json);
        this.objectsLoaded = true;
        return this;
    }

    public destroy() {
        this.instance?.destroy();
        this.objectsLoaded = false;
        this.instance = null;
    }

    public selectItem(id: ObjectID) {
        return this.instance?.getObjects().get(id);
    }

    public moveToStep(stepNumber: number) {
        this.instance?.setStep(stepNumber);
    }

    public getObjects() {
        return this.instance?.getObjects();
    }

    public on(selector: ObjectID, event: string, callback: CallbackFunction) {
        const item = this.selectItem(selector);
        if (item == null) {
            return;
        }
        item.getMesh().addEventListener(event, (e: Event) => {
            callback(item, e);
        });
    }

    public group(event: string, callback: CallbackFunction) {
        this.getObjects()?.forEach((item) => {
            item.getMesh().addEventListener(event, (e) => {
                callback(item, e);
            });
        });
    }

    public getAnimations() {
        return AnimationStorage.getAnimations();
    }
}

export default Factory;

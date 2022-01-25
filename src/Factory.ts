import { Event } from "three";
import Init from "./initialization/Init";
import AnimationStorage from "./initialization/stepper/AnimationStorage";
import {
    AnimationDef,
    CallbackFunction,
    ObjectID,
    UUID,
} from "./types/applicationTypes";
import { Config } from "./types/configTypes";
import { JSON } from "./types/jsonTypes";
import { v4 as uuidv4 } from "uuid";

class Factory {
    private instance: Init | null;
    public objectsLoaded = false;
    private uuid: UUID;

    static instanceCounter = 0;

    constructor(config?: Config) {
        if (config == null) throw new Error("Config not specified!");
        Factory.instanceCounter = Math.max(Factory.instanceCounter, 0) + 1;
        this.uuid = this.generateUUID();
        this.instance = new Init(config, this.uuid);
        return this;
    }

    private generateUUID() {
        let uuid = uuidv4();
        uuid = uuid.replace(/-/g, "");

        console.log(
            "Factory instance:",
            Factory.instanceCounter,
            " with uuid: " + uuid
        );
        return uuid;
    }

    public loadJSON(json: JSON) {
        this.instance?.withJSON(json);
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

    //Listeners functions
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

    //Animation functions
    public getAnimation(animationName: string) {
        return AnimationStorage.getAnimation(animationName);
    }
    public getAnimations() {
        return AnimationStorage.getAnimations();
    }
    public addAdnimation(animationName: string, animtaion: AnimationDef) {
        AnimationStorage.addAnimation(animationName, animtaion);
    }
    public removeAnimation(animationName: string) {
        AnimationStorage.removeAnimation(animationName);
    }
    public aliasAnimation(animationName: string, aliasName: string) {
        AnimationStorage.setAlias(animationName, aliasName);
    }
}

export default Factory;

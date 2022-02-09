import { Event } from "three";
import Init from "./initialization/Init";
import AnimationStorage from "./initialization/stepper/AnimationStorage";
import {
    AnimationDef,
    CallbackFunction,
    ObjectID,
    Objects3D,
    UUID,
} from "./types/applicationTypes";
import { Config } from "./types/configTypes";
import { JSON } from "./types/jsonTypes";
import { v4 as uuidv4 } from "uuid";
import Object3D from "stuff/Object3D";

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
        uuid = `tw-${uuid}`;

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

    public getItem(id:ObjectID){
        return this.instance?.getItem(id);
    }

    public selectItem(id: ObjectID) {
        const obj = this.instance?.getItem(id);
        obj?.then(res => {
            const outline = res?.getOutline();
            outline?.layers.toggle(0);
            res?.getMesh().dispatchEvent({ type: "click", data: res });
        })
    }

    public moveToStep(stepNumber: number) {
        this.instance?.setStep(stepNumber);
    }

    public getObjects() {
        this.instance?.getItems().then((result) => {
            return result;
        });
    }

    //Listeners functions
    public on(selector: ObjectID, event: string, callback: CallbackFunction) {
        this.instance?.getItems()?.then((res) => {
            const item = res.get(selector);
            if (item == null){
                return;
            }
            item.getMesh().addEventListener(event, (e:Event)=>{
                callback(item, e);
            })
        });
    }

    public group(event: string, callback: CallbackFunction) {
        this.instance?.getItems().then((objects: Objects3D) => {
            objects.forEach((item: Object3D) => {
                item.getMesh().addEventListener(event, (e) => {
                    callback(item, e);
                });
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

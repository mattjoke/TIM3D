import { Config } from "./types/configTypes";
import { Event } from "three";
import Init from "./Init";
import { JSON } from "./types/jsonTypes";
import { ObjectID } from "./types/applicationTypes";

class Factory {
    private instance: Init;
    public objectsLoaded = false;

    constructor(config?: Config) {
        if (config == null) throw new Error("Config not specified!");
        this.instance = new Init(config);
        return this;
    }
    public async loadJSON(json: JSON) {
        await this.instance.withJSON(json);
        return this;
    }

    public selectItem(id: ObjectID) {
        return this.instance.getObjects().get(id);
    }

    public moveToStep(stepNumber: number) {
        this.instance.setStep(stepNumber);
    }

    public getObjects() {
        return this.instance.getObjects();
    }

    public on(selector: ObjectID, event: string, callback: Function) {
        this.selectItem(selector)
            ?.getMesh()
            .addEventListener(event, (e: Event) => {
                callback(e);
            });
    }
    
    public group(event: string, callback: Function) {
        this.getObjects().forEach((item) => {
            item.getMesh().addEventListener(event, (e) => {
                callback(e);
            });
        });
    }
}

export default Factory;

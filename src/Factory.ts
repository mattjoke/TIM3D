import { Config } from "./types/configTypes";
import Init from "./Init";
import { JSON } from "./types/jsonTypes";
import { ObjectID } from "./types/applicationTypes";

class Factory {
    private instance: Init;
    public objectsLoaded = false;

    constructor(config?: Config) {
        if (config == null) throw new Error("Config not specified!");
        this.instance = new Init(config);
    }
    public async loadJSON(json: JSON) {
        await this.instance.withJSON(json);
        return this;
    }

    public selectItem(name: ObjectID) {
        if (this.objectsLoaded) {
            return this.instance.selectItem(name);
        }
    }
    public moveToStep(num: number) {
        this.instance.moveToStep(num);
    }

    public on(selector: ObjectID, event: string, callback: Function) {
        this.selectItem(selector)
            ?.getMesh()
            .addEventListener(event, (e) => {
                callback(e);
            });
    }
}

export default Factory;

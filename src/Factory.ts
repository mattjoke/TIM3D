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
        const loaded = await this.instance.withJSON(json);
        console.log(loaded);
        this.objectsLoaded = loaded.values.length > 0;
        return this;
    }

    public selectItem(name: ObjectID) {
        if (this.objectsLoaded) {
            return this.instance.selectItem(name);
        }
        setTimeout(() => {
            this.selectItem(name);
        }, 100);
    }
    public moveToStep(num: number) {
        this.instance.moveToStep(num);
    }

    on(selector: ObjectID, event: string, callback: Function) {
        console.log(this.selectItem(selector));
        this.selectItem(selector)
            ?.getMesh()
            .addEventListener(event, (e) => {
                callback(e);
            });
    }
}

function Factor(selector: ObjectID) {}

Factor.initManual = (config: Config) => {
    return new Factory(config);
};

export default Factor;

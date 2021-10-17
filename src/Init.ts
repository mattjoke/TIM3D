import { AmbientLight, Color, Event, PointLight } from "three";
import { ObjectID, Objects3D } from "./types/applicationTypes";
import Axis from "./initialization/Axis";
import { Config } from "./types/configTypes";
import { JSON } from "./types/jsonTypes";
import Loader from "./stuff/Loader";
import Overlay from "./initialization/Overlay";
import Stepper from "./initialization/Stepper";
import Window from "./initialization/Window";

class Init {
    private window: Window;
    private overlay: HTMLDivElement;
    private stepper: Stepper | undefined;
    private objects: Objects3D;

    public objectsLoaded = false;

    constructor(config: Config) {
        this.checkConfig(config);

        this.window = new Window(config.container!);
        this.initPlane();
        this.initAxes();
        this.objects = new Map();
        this.overlay = document.createElement("div");

        // Run the animations
        this.window.animate();
    }

    public initPlane() {
        const light = new AmbientLight("white");
        light.intensity = 0.3;
        const l = new PointLight("white");
        l.intensity = 0.6;
        l.position.set(150, 150, 105);
        // const helper = new GridHelper(1000, 1000);
        this.window.addObject(light, l);
    }

    private initAxes() {
        this.window.addObject(Axis(10, new Color("blue"), [1, 0, 0]));
        this.window.addObject(Axis(10, new Color("red"), [0, 0, 1]));
        this.window.addObject(Axis(10, new Color("green"), [0, 1, 0]));
    }

    public async withJSON(json: JSON) {
        this.objects = await Loader(
            json.files ?? [],
            this.window.container,
            this.window
        );

        this.stepper = new Stepper(json, this.objects);

        this.overlay = Overlay(this.stepper, this.window);
        this.window.container.appendChild(this.overlay);

        this.objectsLoaded = this.objects.size > 0;
    }

    public selectItem(id: ObjectID) {
        return this.objects.get(id);
    }

    public moveToStep(stepNum: number) {
        this.stepper?.setStep(stepNum);
    }

    private checkConfig(config: Config) {
        if (config == null) {
            throw new Error("Config is not defined!");
        }
        if (config.container == null) {
            throw new Error("Container is not defined!");
        }
    }

    public on(selector: ObjectID, event: string, callback: Function) {
        this.selectItem(selector)?.addEventListener(event, (e: Event) => {
            callback(e);
        });
    }
}

export default Init;

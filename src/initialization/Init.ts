import { Line, Object3D } from "three";
import { ConfigCheck, JsonCheck } from "../inputChecking/InputCheck";
import Loader from "../stuff/Loader";
import { Objects3D } from "../types/applicationTypes";
import { Config } from "../types/configTypes";
import { JSON } from "../types/jsonTypes";
import Axis from "./init/Axis";
import PlaneInit from "./init/PlaneInit";
import Stepper from "./Stepper";
import Window from "./Window";
import Overlay from "./window/Overlay";

class Init {
    private window: Window;
    private overlay: HTMLDivElement;
    private stepper: Stepper | undefined;
    private objects: Objects3D;

    private parentUUID: string;
    private config: Config;
    
    public objectsLoaded = false;

    constructor(config: Config, uuid: string) {
        this.checker(config, ConfigCheck);
        this.config = config;
        this.parentUUID = uuid;

        this.objects = new Map();
        this.window = new Window(config);
        this.initPlane();
        this.initAxes();
        this.overlay = document.createElement("div");

        // Run the animations
        this.window.animate();
    }

    public initPlane() {
        const [light, ambient] = PlaneInit();
        this.addObjects(light, ambient);
    }

    private initAxes() {
        const init = Axis(1.0);
        init.forEach((axis: Line) => {
            this.addObjects(axis);
        });
    }

    public withJSON(json: JSON) {
        this.objectsLoaded = false;
        this.checker(json, JsonCheck);

        Loader(json.files ?? [], this.window, this.config).then((value) => {
            this.objects = value;
            this.objectsLoaded = this.objects.size > 0;

            this.stepper = new Stepper(
                json,
                this.objects.get.bind(this.objects),
                this.config.animationLoop
            );

            this.overlay = Overlay(
                this.stepper,
                this.window,
                this.parentUUID,
                this.config.sidebar
            );
            this.window.container.appendChild(this.overlay);
        });

        return this;
    }

    private checker(
        object: object,
        checker: typeof JsonCheck | typeof ConfigCheck
    ) {
        const check = checker(object);
        if (!check.success) {
            check.error.issues.forEach((issue) => {
                throw new SyntaxError(`${issue.message}`)
            });
        }
        
        return check.success;
    }

    public getObjects() {
        return this.objects;
    }
    public getStepper() {
        return this.stepper;
    }

    public addObjects(...objects: any) {
        objects.forEach((obj: Object3D) => {
            this.window.getScene().addObject(obj);
        });
    }

    public setStep(stepNumber: number) {
        const currStep = this.stepper?.setStep(stepNumber);
        this.overlay.dispatchEvent(
            new CustomEvent("update", { detail: currStep })
        );
    }

    public destroy() {
        this.window.destroy();
        this.overlay.remove();
        this.stepper?.destroy();
        this.objects.clear();
        this.objectsLoaded = false;
    }
}

export default Init;
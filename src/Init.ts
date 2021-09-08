import { AmbientLight, Color, PointLight } from "three";
import Axis from "./initialization/Axis";
import Overlay from "./initialization/Overlay";
import Stepper from "./initialization/Stepper";
import Window from "./initialization/Window";
import Loader from "./stuff/Loader";
import { ObjectID, Objects3D } from "./types/applicationTypes";
import { Config } from "./types/configTypes";
import { JSON } from "./types/jsonTypes";

class Init {
    private window: Window;
    private overlay: HTMLDivElement;
    private stepper: Stepper;
    private objects: Objects3D;

    constructor(config: Config) {
        this.window = new Window(config.container);
        this.initPlane(config.enviroment);
        this.initAxes();

        // Run the animations
        this.window.animate();
    }
    initPlane(_config: Config) {
        const light = new AmbientLight("white");
        light.intensity = 0.3;
        const l = new PointLight("white");
        l.intensity = 0.3;
        l.position.set(5, 5, 5);
        // const helper = new GridHelper(100, 100);
        this.window.addObject(light, l);
    }
    initAxes() {
        this.window.addObject(Axis(10, new Color("blue"), [1, 0, 0]));
        this.window.addObject(Axis(10, new Color("red"), [0, 0, 1]));
        this.window.addObject(Axis(10, new Color("green"), [0, 1, 0]));
    }

    whithJSON = async (json: JSON) => {
        this.objects = await Loader(
            json.files,
            this.window.container,
            this.window
        );
        this.stepper = new Stepper(json, this.objects);

        this.overlay = Overlay(this.stepper, this.window);
        this.window.container.appendChild(this.overlay);
    };

    selectItem(id: ObjectID) {
        console.log(`Selected ${id}`);
    }
}

export default Init;

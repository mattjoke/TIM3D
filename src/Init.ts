import { AmbientLight, Color, GridHelper, PointLight } from "three";
import Axis from "./initialization/Axis";
import Overlay from "./initialization/Overlay";
import Stepper from "./initialization/Stepper";
import Window from "./initialization/Window";
import Loader from "./stuff/Loader";
import { JSON } from "./types/jsonTypes";

class Init {
    public static window = new Window();
    private overlay: HTMLDivElement;
    private stepper: Stepper;

    constructor() {
        this.initPlane();
        this.initAxes();

        //Run the animations
        Init.window.animate();
    }
    initPlane() {
        const light = new AmbientLight("white");
        light.intensity = 0.3;
        const l = new PointLight("white");
        l.intensity = 0.3;
        l.position.set(5, 5, 5);
        const helper = new GridHelper(100, 100);
        Init.window.addObject(light, helper, l);
    }
    initAxes() {
        new Axis(10, new Color("blue"), [1, 0, 0]);
        new Axis(10, new Color("red"), [0, 0, 1]);
        new Axis(10, new Color("green"), [0, 1, 0]);
    }

    whithJSON = async (json: JSON) => {
        this.stepper = new Stepper(json);
        this.overlay = Overlay(this.stepper.length);
        Init.window.container.appendChild(this.overlay);
    };
}

export default Init;

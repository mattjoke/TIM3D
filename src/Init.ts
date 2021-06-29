import { AmbientLight, Color, GridHelper, PointLight } from "three";
import Box from "./geometry/Box";
import Axis from "./initialization/Axis";
import Window from "./initialization/Window";
import Loader from "./stuff/Loader";

class Init {
    public static window = new Window();

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

    whithJSON(json: {
        files: { file: string; color: string; name: string }[];
    }) {
        Loader(json);
    }
    constructor() {
        this.initPlane();
        this.initAxes();

        //Run the animations
        Init.window.animate();
    }
}

export default Init;

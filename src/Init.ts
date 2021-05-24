import { AmbientLight, GridHelper, PointLight } from "three";
import Box from "./geometry/Box";
import Window from "./initialization/Window";
import Loader from "./stuff/Loader";

class Init {
    public static window = new Window();

    initPlane() {
        const box = new Box();
        const light = new AmbientLight("white");
        light.intensity = 0.3;
        const l = new PointLight("white");
        l.intensity = 0.3;
        l.position.set(5, 5, 5);
        const helper = new GridHelper(100, 100);
        Init.window.addObject(box, light, helper, l);
    }

    whithJSON(json: {
        files: { file: string; color: string; name: string }[];
    }) {
        var loader = Loader(json);
    }
    constructor() {
        this.initPlane();

        //Run the animations
        Init.window.animate();
    }
}

export default Init;

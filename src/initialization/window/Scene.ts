import {
    AxesHelper,
    Color, Object3D,
    Scene as ThreeScene
} from "three";
import { isColor } from "../../stuff/Utils";

class Scene {
    private instance: ThreeScene;
    constructor(backgroundColor?: Color | string) {
        this.instance = new ThreeScene();

        if (backgroundColor == null) {
            this.instance.background = new Color("#ede7e6");
        } else if (
            typeof backgroundColor === "string" &&
            !isColor(backgroundColor)
        ) {
            this.instance.background = new Color("#ede7e6");
            console.warn("Cannot parse unknown color:", backgroundColor);
        } else {
            this.instance.background = new Color(backgroundColor);
        }
        this.initAxexHelper();
    }

    private initAxexHelper() {
        const axes = new AxesHelper(100);
        axes.position.set(0, 0, 0);
        axes.rotateY(Math.PI / 2);
        axes.layers.set(3);

        this.instance.add(axes);
    }

    public getInstance() {
        return this.instance;
    }

    public addObject(...objects: Object3D[]) {
        objects.forEach((object) => {
            this.instance.add(object);
        });
    }
}

export default Scene;

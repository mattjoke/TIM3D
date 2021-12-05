import { Color, Object3D, Scene as ThreeScene } from "three";

class Scene {
    private instance: ThreeScene;
    constructor(backgroundColor?: Color | string) {
        this.instance = new ThreeScene();

        this.instance.background = new Color(backgroundColor);

        if (this.instance.background.equals(new Color())) {
            console.warn("Cannot parse unknown color:", backgroundColor);
            this.instance.background = new Color("#ede7e6");
        }
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

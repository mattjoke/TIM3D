import { Color, Object3D, Scene as ThreeScene } from "three";

class Scene {
    private instance: ThreeScene;
    constructor(backgroundColor?: Color | string) {
        this.instance = new ThreeScene();

        console.log(backgroundColor);

        if (backgroundColor instanceof Color) {
            this.instance.background = backgroundColor;
        } else {
            console.log(new Color( "#ede7e6"));
            this.instance.background = new Color(backgroundColor);
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

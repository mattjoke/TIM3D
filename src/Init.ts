import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import Plane from "./geometry/Plane";

class Init {
    public scene: Scene;
    public renderer: WebGLRenderer;
    public plane: Plane;
    initPlane = () => {
        this.plane = new Plane();
    };
    constructor() {
        const scene = new Scene();
        scene.background = new Color();
        const camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.initPlane;
    }
}

export default Init;

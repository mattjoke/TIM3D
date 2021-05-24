import {
    Color,
    Object3D,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Box from "../geometry/Box";

class Window {
    public scene: Scene;
    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;
    private container: HTMLElement;

    private animators: any[] = [];

    constructor() {
        this.scene = new Scene();
        this.scene.background = new Color("teal");
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.container = document.getElementById("container");
        this.container.style.backgroundColor = "blue";
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(
            this.container.offsetWidth,
            this.container.offsetHeight
        );
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.set(0, 0, 5);

        new OrbitControls(this.camera, this.renderer.domElement);
    }

    addObject(...objects: any[]) {
        objects.forEach((object) => {
            if (object instanceof Box) {
                this.animators.push(object);
                this.scene.add(object.instance);
            } else {
                this.scene.add(object);
            }
        });
    }

    public animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.animators.forEach((object) => {
            object.animate();
        });
    }
}

export default Window;

import {
    Color,
    Object3D,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Box from "../geometry/Box";

class Window {
    public scene: Scene = new Scene();
    private renderer: WebGLRenderer = new WebGLRenderer();
    private camera: PerspectiveCamera;
    public container: HTMLElement;

    private orbitalControls: OrbitControls;

    private animators: any[] = [];

    constructor() {
        this.scene.background = new Color("teal");
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.container = document.getElementById("container");
        this.container.style.backgroundColor = "blue";
        this.renderer.setSize(
            this.container.offsetWidth,
            this.container.offsetHeight
        );
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.set(5, 5, 10);

        this.orbitalControls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        requestAnimationFrame(this.animate.bind(this));
    }

    public resetCamera() {
        this.orbitalControls.reset();
    }

    onWindowResize() {
        this.camera.aspect =
            this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
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

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);

        this.onWindowResize();

        this.animators.forEach((object) => {
            object.animate();
        });
    }
}

export default Window;

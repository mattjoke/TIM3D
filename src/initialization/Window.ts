import { update } from "@tweenjs/tween.js";
import { Color, Object3D, PerspectiveCamera, Scene } from "three";
import OrbitalControls from "./window/OrbitalControls";
import Renderer from "./window/Renderer";

class Window {
    public scene: Scene = new Scene();
    private renderer: Renderer;
    private camera: PerspectiveCamera;
    public container: HTMLElement;

    private orbitalControls: OrbitalControls;

    private animators: any[] = [];

    constructor(container: HTMLElement) {
        if (container == null) {
            this.container = document.createElement("div");
            this.container.id = "container";
            document.appendChild(this.container);
            console.warn("Container not specified! Using default one");
        }

        this.scene.background = new Color("#ede7e6");

        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        
        this.camera.position.set(100, 100, 110);
        this.container = container ?? document.getElementById("container");
        this.container.style.backgroundColor = "blue";
        this.container.style.position = "relative";

        this.renderer = new Renderer(
            {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight,
            },
            this.scene,
            this.camera
        );

        this.container.appendChild(this.renderer.domElement);

        //Orbital controls
        this.orbitalControls = new OrbitalControls(this.camera, this.renderer);

        this.animate();
    }

    public resetCamera() {
        this.orbitalControls.reset();
    }
    public getCamera() {
        return this.camera;
    }
    public getScene() {
        return this.scene;
    }

    private onWindowResize() {
        this.camera.aspect =
            this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize({
            width: this.container.clientWidth,
            height: this.container.clientHeight,
        });
    }

    public addObject(...objects: Object3D[]) {
        objects.forEach((object) => {
            this.scene.add(object);
        });
    }

    public addAnimator(...objects: Object3D[]) {
        objects.forEach((object) => {
            this.animators.push(object);
        });
    }

    public animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.onWindowResize();

        this.orbitalControls.update();

        this.renderer.render(this.scene, this.camera);

        // Tween update
        update();
    }
}

export default Window;

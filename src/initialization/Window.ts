import { Config } from "@manualTypes/configTypes";
import { update } from "@tweenjs/tween.js";
import { Object3D, Vector3 } from "three";
import Camera from "./window/Camera";
import Container from "./window/Container";
import OrbitalControls from "./window/OrbitalControls";
import Renderer from "./window/Renderer";
import Scene from "./window/Scene";

class Window {
    public scene: Scene;
    private renderer: Renderer;
    private camera;
    public container: Container;

    private orbitalControls: OrbitalControls;

    private animators: any[] = [];

    constructor(config: Config) {
        this.container = new Container(config.container);

        this.scene = new Scene(config.backgroundColor);

        this.camera = Camera(
            window.innerWidth / window.innerHeight,
            new Vector3(100, 100, 110)
        );

        this.renderer = new Renderer(
            this.container.getSizing(),
            this.scene.getInstance(),
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
    public getContainer() {
        return this.container.getInstance();
    }

    private onWindowResize() {
        const sizing = this.container.getSizing();
        this.camera.aspect = sizing.width / sizing.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(sizing);
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

        this.renderer.render(this.scene.getInstance(), this.camera);

        update();
    }
}

export default Window;

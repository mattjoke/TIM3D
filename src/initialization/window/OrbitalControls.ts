import { Easing, Tween } from "@tweenjs/tween.js";
import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Renderer from "./Renderer";

class OrbitalControls {
    private controls: OrbitControls;
    private camera: Camera;

    constructor(camera: Camera, renderer: Renderer) {
        this.controls = new OrbitControls(camera, renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        this.controls.addEventListener("start", () => {
            renderer.lockHighlight();
        });
        this.controls.addEventListener("end", () => {
            renderer.unlockHightlight();
        });

        this.camera = camera;
    }

    public update() {
        this.controls.update();
    }
    public reset() {
        new Tween(this.camera.position) 
            .to({ x: 100, y: 100, z: 110 }, 1000)
            .easing(Easing.Quadratic.Out)
            .start();
        this.controls.reset();
    }
}

export default OrbitalControls;

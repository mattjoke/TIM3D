import { Easing, Tween } from "@tweenjs/tween.js";
import { Camera, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Renderer from "./Renderer";

class OrbitalControls {
    private controls: OrbitControls;
    private camera: Camera;

    private startingPosition = new Vector3(100, 100, 110);
    private worldPosition = new Vector3(0, 0, 0);

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

    public setStartingPosition(position: Vector3) {
        this.startingPosition = position;
    }

    public setWorldPosition(worldPosition: Vector3) {
        this.worldPosition = worldPosition;
        this.controls.target.set(
            worldPosition.x,
            worldPosition.y,
            worldPosition.z
        );
        this.controls.target.normalize();
        this.reset();
    }

    public destroy() {
        this.controls.dispose();
        this.camera.clear();
    }

    public update() {
        this.controls.update();
    }

    public reset() {
        this.controls.enableDamping = false;
        new Tween(this.camera.position)
            .to(this.startingPosition, 500)
            .easing(Easing.Quadratic.Out)
            .start();
        new Tween(this.controls.target)
            .to(this.worldPosition, 500)
            .easing(Easing.Quadratic.Out)
            .start()
            .onComplete((_) => {
                this.controls.enableDamping = true;
            });
    }
}

export default OrbitalControls;

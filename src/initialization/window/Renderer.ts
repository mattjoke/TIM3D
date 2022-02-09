import { Easing, Tween } from "@tweenjs/tween.js";
import {
    Camera,
    Color,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Raycaster,
    Scene,
    Vector2,
    WebGLRenderer,
} from "three";
import { containerSize, inputPosition } from "../../types/applicationTypes";
import { Colors } from "../../types/configTypes";

class Renderer {
    private renderer: WebGLRenderer;
    public domElement: HTMLElement;

    private locker = true;

    private lastHighlight: Mesh | null = null;
    private customEmissive: Color | string | undefined;

    constructor(
        { width, height }: containerSize,
        scene: Scene,
        camera: Camera,
        colors?: Colors
    ) {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);

        this.customEmissive = colors?.emissiveColor;

        this.domElement = this.renderer.domElement;
        this.initCallbacks(scene, camera);
    }

    public initCallbacks(scene: Scene, camera: Camera) {
        this.renderer.domElement.addEventListener(
            "touchstart",
            (ev: TouchEvent) => {
                if (!this.locker) return;

                const touch = ev.touches[0];
                const pos = { clientX: touch.clientX, clientY: touch.clientY };
                this.selectObject(pos, scene, camera);
            }
        );

        this.renderer.domElement.addEventListener(
            "dblclick",
            (ev: MouseEvent) => {
                if (!this.locker) return;

                const pos = { clientX: ev.clientX, clientY: ev.clientY };
                this.selectObject(pos, scene, camera);
            }
        );

        this.renderer.domElement.addEventListener(
            "mousemove",
            (ev: MouseEvent) => {
                if (!this.locker) return;

                const pos = { clientX: ev.clientX, clientY: ev.clientY };
                this.highlightObject(pos, scene, camera);
            }
        );

        this.renderer.domElement.addEventListener(
            "mouseenter",
            (ev: MouseEvent) => {
                this.unlockHightlight();
            }
        );
        this.renderer.domElement.addEventListener(
            "mouseleave",
            (ev: MouseEvent) => {
                this.lockHighlight();
            }
        );
    }

    public lockHighlight() {
        const material = this.lastHighlight?.material as MeshStandardMaterial;
        material?.emissive.setHex(0x000000);
        this.lastHighlight = null;
        this.locker = false;
    }
    public unlockHightlight() {
        this.locker = true;
    }

    public destroy() {
        this.renderer.clear();
        this.domElement.remove();
        this.locker = false;
        this.lastHighlight = null;
        this.customEmissive = undefined;
    }

    public setSize({ width, height }: containerSize) {
        this.renderer.setSize(width, height);
        this.domElement = this.renderer.domElement;
    }
    public render(scene: Scene, camera: PerspectiveCamera) {
        //this.renderer.autoClear = false;
        this.renderer.render(scene, camera);

        /*camera.layers.set(3);
        this.renderer.clearDepth();
        this.renderer.setScissorTest(true);
        this.renderer.setScissor(0,50,100,100);
        this.renderer.setViewport(0,50,100,100);
        this.renderer.render(scene, camera);
        this.renderer.setScissorTest(false);        
        camera.layers.set(0);*/
    }

    public getBoundingRect() {
        return this.renderer.domElement.getBoundingClientRect();
    }

    private computeRaycast(
        position: inputPosition,
        scene: Scene,
        camera: Camera
    ) {
        const { bottom, right, left, top } = this.getBoundingRect();
        const raycaster = new Raycaster();
        const { clientX, clientY } = position;
        const mouse = new Vector2(
            ((clientX - left) / (right - left)) * 2 - 1,
            -((clientY - top) / (bottom - top)) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        return raycaster.intersectObjects(scene.children, true);
    }

    private selectObject(
        position: inputPosition,
        scene: Scene,
        camera: Camera
    ) {
        const intersects = this.computeRaycast(position, scene, camera);
        for (let i = 0; i < intersects.length; i++) {
            const obj = intersects[i].object;
            if (obj.type !== "Mesh" || obj.name.includes("-outline")) {
                continue;
            }
            const outline = scene.getObjectByName(`${obj.name}-outline`);
            if (!outline) break;
            outline.layers.toggle(0);
            obj.dispatchEvent({ type: "click", data: obj });
        }
    }

    private highlightObject(
        position: inputPosition,
        scene: Scene,
        camera: Camera
    ) {
        const intersects = this.computeRaycast(position, scene, camera);

        if (this.lastHighlight != null && intersects.length == 0) {
            const material = this.lastHighlight
                .material as MeshStandardMaterial;
            const startHex = {
                hex: material.emissive.getHex(),
            };
            new Tween(startHex)
                .to({ hex: 0x000000 }, 200)
                .easing(Easing.Linear.None)
                .onUpdate(() => {
                    material.emissive.setHex(startHex.hex);
                })
                .start();
            this.lastHighlight = null;
        }

        for (let i = 0; i < intersects.length; i++) {
            const obj = intersects[i].object as Mesh;
            if (obj.type !== "Mesh" || obj.name.includes("-outline")) {
                continue;
            }

            const material = obj.material as MeshStandardMaterial;
            if (this.lastHighlight == null) {
                this.lastHighlight = obj;
                material.emissive = new Color(this.customEmissive ?? 0x0000ff);
                obj.dispatchEvent({ type: "hover", data: obj });
            }
        }
    }
}

export default Renderer;

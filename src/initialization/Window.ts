import {
    Color,
    Object3D,
    PerspectiveCamera,
    Raycaster,
    Scene,
    Vector2,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { inputPosition } from "../types/applicationTypes";

class Window {
    public scene: Scene = new Scene();
    private renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
    private camera: PerspectiveCamera;
    public container: HTMLElement;

    private orbitalControls: OrbitControls;

    private mouse: Vector2;
    private raycaster: Raycaster;

    private animators: any[] = [];

    constructor(container: HTMLElement) {
        if (container == null) {
            this.container = document.createElement("div");
            console.warn("Container not specified! Using default one");
        }

        this.scene.background = new Color("teal");
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.container = container ?? document.getElementById("container");
        this.container.style.backgroundColor = "blue";
        this.renderer.setSize(
            this.container.offsetWidth,
            this.container.offsetHeight
        );
        this.container.style.position = "relative";
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.set(100, 100, 110);

        this.mouse = new Vector2();
        this.raycaster = new Raycaster();
        this.renderer.domElement.addEventListener(
            "touchstart",
            (ev: TouchEvent) => {
                const touch = ev.touches[0];
                const pos = { clientX: touch.clientX, clientY: touch.clientY };
                this.selectObject(
                    pos,
                    this.renderer.domElement.getBoundingClientRect()
                );
            }
        );
        this.renderer.domElement.addEventListener("click", (ev: MouseEvent) => {
            const pos = { clientX: ev.clientX, clientY: ev.clientY };
            this.selectObject(
                pos,
                this.renderer.domElement.getBoundingClientRect()
            );
        });

        // this.renderer.domElement.addEventListener("touchstart", this.selectObject);

        this.orbitalControls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        requestAnimationFrame(this.animate.bind(this));
    }

    public resetCamera() {
        this.orbitalControls.reset();
    }

    public getCamera() {
        return this.camera;
    }

    public getDomRect() {
        return this.renderer.domElement.getBoundingClientRect();
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

    addObject(...objects: Object3D[]) {
        objects.forEach((object) => {
            this.scene.add(object);
        });
    }

    selectObject(position: inputPosition, canvas: DOMRect) {
        // this.mouse.set(ev.clientX, ev.clientY)
        const { clientX, clientY } = position;
        this.mouse.set(
            ((clientX - canvas.left) / (canvas.right - canvas.left)) * 2 - 1,
            -((clientY - canvas.top) / (canvas.bottom - canvas.top)) * 2 + 1
        );

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        for (let i = 0; i < intersects.length; i++) {
            const obj = intersects[i].object;
            if (obj.type !== "Mesh") {
                continue;
            }
            const outline = this.scene.getObjectByName(`${obj.name}-outline`);
            if (!outline) break;
            outline.layers.toggle(0);
            obj.dispatchEvent({ type: "click", data: obj });
            break;
        }
        // this.insideContainer = false;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.onWindowResize();

        this.animators.forEach((object) => {
            object.animate();
        });

        this.renderer.render(this.scene, this.camera);
    }
}

export default Window;

import {
    Color,
    Mesh,
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

    private lastHighlight: Object3D | null = null;
    private locker = true;

    private animators: any[] = [];

    constructor(container: HTMLElement) {
        if (container == null) {
            this.container = document.createElement("div");
            console.warn("Container not specified! Using default one");
        }

        this.scene.background = new Color("#ede7e6");
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
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
                if (!this.locker) return;
                const touch = ev.touches[0];
                const pos = { clientX: touch.clientX, clientY: touch.clientY };
                this.selectObject(
                    pos,
                    this.renderer.domElement.getBoundingClientRect()
                );
            }
        );
        this.renderer.domElement.addEventListener(
            "dblclick",
            (ev: MouseEvent) => {
                if (!this.locker) return;
                const pos = { clientX: ev.clientX, clientY: ev.clientY };
                this.selectObject(
                    pos,
                    this.renderer.domElement.getBoundingClientRect()
                );
            }
        );

        this.renderer.domElement.addEventListener(
            "mousemove",
            (ev: MouseEvent) => {
                if (!this.locker) return;
                const pos = { clientX: ev.clientX, clientY: ev.clientY };
                this.highlightObject(
                    pos,
                    this.renderer.domElement.getBoundingClientRect()
                );
            }
        );

        // this.renderer.domElement.addEventListener("touchstart", this.selectObject);

        //Orbital controls
        this.orbitalControls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.orbitalControls.enableDamping = true;
        this.orbitalControls.dampingFactor = 0.05;
        this.orbitalControls.addEventListener("start", (ev)=>{
            this.locker = false;
        })
        this.orbitalControls.addEventListener("end", (ev)=>{
            this.locker = true;
        });

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

    private onWindowResize() {
        this.camera.aspect =
            this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
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
    

    private selectObject(position: inputPosition, canvas: DOMRect) {
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

    private highlightObject(positon: inputPosition, canvas: DOMRect) {
        const raycaster = new Raycaster();
        const mouse = {
            x:
                ((positon.clientX - canvas.left) /
                    (canvas.right - canvas.left)) *
                    2 -
                1,
            y:
                -(
                    (positon.clientY - canvas.top) /
                    (canvas.bottom - canvas.top)
                ) *
                    2 +
                1,
        };

        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);

        if (this.lastHighlight != null && intersects.length == 0) {
            //@ts-ignore
            this.lastHighlight.material.emissive.setHex(this.lastHighlight.lastHex);
            this.lastHighlight = null;
        }

        for (let i = 0; i < intersects.length; i++) {
            const obj = intersects[i].object;
            if (obj.type !== "Mesh") {
                continue;
            }
            if (this.lastHighlight == null && !obj.name.includes("-outline")) {
                this.lastHighlight = obj;
                //@ts-ignore
                this.lastHighlight.lastHex = obj.material.emissive.getHex();
                //@ts-ignore
                obj.material.emissive.setHex(0x0000ff);
                obj.dispatchEvent({type:"hover", data:obj});
                break;
            }
        }
        // this.insideContainer = false;
    }

    public animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.onWindowResize();

        this.orbitalControls.update()

        this.renderer.render(this.scene, this.camera);
    }
}

export default Window;

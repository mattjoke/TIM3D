import {
    BackSide,
    BufferGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
} from "three";
import { File } from "@manualTypes/jsonTypes";

class Object3D {
    private geometry: BufferGeometry;
    private mesh: Mesh;
    private outline: Mesh;

    constructor(geometry: BufferGeometry, file: File) {
        this.geometry = geometry;
        this.mesh = this.buildMesh(this.geometry, file);
        this.outline = this.buildOutline(this.geometry, file);
    }

    public getMesh() {
        return this.mesh;
    }
    public getOutline() {
        return this.outline;
    }
    private buildMesh(geometry: BufferGeometry, file: File) {
        const material = new MeshStandardMaterial({
            name: file.name.toString(),
            color: file.color || "white",
            opacity: 0.5,
            flatShading: false,
            clipShadows: false,
            metalness: 0,
        });

        if (file.name == "5") {
            material.color = new Color("green");
        }
        geometry.computeVertexNormals();
        const mesh = new Mesh(geometry, material);
        mesh.position.set(Math.floor(Math.random() * -700 + 300), 0, 0);
        mesh.rotateX(-Math.PI / 2);
        mesh.name = file.name.toString();
        return mesh;
    }
    private buildOutline(geometry: BufferGeometry, file: File): Mesh {
        const outline = new MeshBasicMaterial({
            color: "blue",
            side: BackSide,
        });
        const selected = new Mesh(geometry, outline);
        selected.name = `${file.name.toString()}-outline`;
        selected.position.set(
            this.mesh.position.x,
            this.mesh.position.y,
            this.mesh.position.z
        );
        selected.rotation.set(
            this.mesh.rotation.x,
            this.mesh.rotation.y,
            this.mesh.rotation.z
        );
        selected.scale.multiplyScalar(1.07);
        selected.layers.set(1);
        return selected;
    }
}

export default Object3D;

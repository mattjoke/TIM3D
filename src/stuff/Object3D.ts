import {
    BackSide,
    BufferGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Quaternion,
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

        const pose = file.pose;
        mesh.position.set(
            pose?.position?.[0] || Math.floor(Math.random() * -700 + 300),
            pose?.position?.[1] || 0,
            pose?.position?.[2] || Math.floor(Math.random() * -700 + 300)
        );

        mesh.rotation.setFromQuaternion(
            new Quaternion(
                pose?.orientation?.[0] || 0,
                pose?.orientation?.[1] || 0,
                pose?.orientation?.[2] || 0,
                pose?.orientation?.[3] || 0
            )
        );

        mesh.rotateX(-Math.PI / 2);
        mesh.name = file.name.toString();
        return mesh;
    }
    private buildOutline(geometry: BufferGeometry, file: File): Mesh {
        const outline = new MeshBasicMaterial({
            color: "blue",
            side: BackSide,
        });
        const shadow = new Mesh(geometry, outline);
        shadow.name = `${file.name.toString()}-outline`;
        shadow.position.set(
            this.mesh.position.x,
            this.mesh.position.y,
            this.mesh.position.z
        );
        shadow.rotation.set(
            this.mesh.rotation.x,
            this.mesh.rotation.y,
            this.mesh.rotation.z
        );
        shadow.scale.multiplyScalar(1.07);
        shadow.layers.set(1);
        return shadow;
    }
}

export default Object3D;

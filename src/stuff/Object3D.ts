import { File } from "@manualTypes/jsonTypes";
import {
    BackSide,
    BufferGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Quaternion,
} from "three";
import { isColor } from "./Utils";

class Object3D {
    private file: File;
    private geometry: BufferGeometry;
    private mesh: Mesh;
    private outline: Mesh;

    constructor(geometry: BufferGeometry, file: File) {
        this.geometry = geometry;
        this.file = file;
        this.mesh = this.buildMesh(this.geometry, file);
        this.outline = this.buildOutline(this.geometry, file);
    }

    public getMesh() {
        return this.mesh;
    }
    public setScale(x: number, y: number, z: number) {
        this.mesh.scale.set(x, y, z);
        this.outline.scale.set(x, y, z);
        this.outline.scale.multiplyScalar(1.07);
    }

    public setRotation(rotation: Quaternion) {
        this.getMesh().setRotationFromQuaternion(rotation);
        this.getOutline().setRotationFromQuaternion(rotation);
    }

    public setOutlineFromMesh() {
        this.outline.position.copy(this.mesh.position);
        this.outline.rotation.copy(this.mesh.rotation);
    }
    public setMeshFromOutline() {
        this.mesh.position.copy(this.outline.position);
        this.mesh.rotation.copy(this.outline.rotation);
    }

    public getEmissive() {
        return this.mesh.material;
    }

    public getOutline() {
        return this.outline;
    }

    public setOutlineColor(selectionColor: string | Color | undefined) {
        try {
            if (selectionColor == null) {
                return;
            }
            if (
                typeof selectionColor === "string" &&
                !isColor(selectionColor)
            ) {
                throw new Error(
                    `Cannot parse unknown color: ${selectionColor}`
                );
            }
            const material = this.getOutline().material as MeshStandardMaterial;
            material.color = new Color(selectionColor);
        } catch (error) {
            console.warn(error);
        }
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

        //mesh.rotateX(-Math.PI / 2);
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

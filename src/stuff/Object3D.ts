import { File } from "@manualTypes/jsonTypes";
import {
    BackSide,
    BufferGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    Quaternion,
    Vector3
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
        this.outline = this.buildOutline(this.geometry);
    }

    public getMesh() {
        return this.mesh;
    }
    public setScale(x: number, y: number, z: number) {
        this.mesh.scale.set(x, y, z);
        this.outline.scale.set(x, y, z);
        this.outline.scale.multiplyScalar(1.07);
    }

    public updateMatrix() {
        this.getMesh().updateMatrix();
        this.getOutline().updateMatrix();
    }

    public setPosition(position: Vector3) {
        this.getMesh().position.set(position.x, position.y, position.z);
        this.setOutlineFromMesh();
    }

    public setRotation(rotation: Quaternion) {
        this.getMesh().setRotationFromQuaternion(rotation);
        this.getOutline().setRotationFromQuaternion(rotation);
    }

    public addPosition(position: Vector3 | [number, number, number]) {
        if (position instanceof Vector3) {
            this.getMesh().position.add(position);
        } else {
            this.getMesh().position.add(
                new Vector3(position[0], position[1], position[2])
            );
        }
        this.setOutlineFromMesh();
    }
    public addRotation(rotation: Quaternion) {
        this.setOutlineFromMesh();
    }

    public setOutlineFromMesh() {
        this.outline.position.copy(this.mesh.position);
        this.outline.rotation.copy(this.mesh.rotation);
        this.updateMatrix();
    }
    public setMeshFromOutline() {
        this.mesh.position.copy(this.outline.position);
        this.mesh.rotation.copy(this.outline.rotation);
        this.updateMatrix();
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
            name: `${file.id}-${file.name ?? "defName"}`,
            color: file.color || "white",
            opacity: 0.5,
            flatShading: false,
            clipShadows: false,
            metalness: 0,
        });

        geometry.computeVertexNormals();

        const mesh = new Mesh(geometry, material);
        const pose = file.pose;
        //Custom default position or random position on board
        const position = pose?.position || [
            0, //Math.floor(Math.random() * -700 + 300),
            0,
            0, //Math.floor(Math.random() * -700 + 300),
        ];
        mesh.position.add(new Vector3(position[0], position[1], position[2]));

        const orientation = pose?.orientation || [0, 0, 0, 0];

        mesh.quaternion.set(
            orientation[1],
            orientation[2],
            orientation[3],
            orientation[0]
        );
        mesh.quaternion.normalize();

        mesh.name = `${file.id}-${file.name ?? "defName"}`;
        return mesh;
    }
    private buildOutline(geometry: BufferGeometry): Mesh {
        const outline = new MeshBasicMaterial({
            color: "blue",
            side: BackSide,
        });
        const shadow = new Mesh(geometry, outline);
        shadow.name = `${this.mesh.name}-outline`;
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

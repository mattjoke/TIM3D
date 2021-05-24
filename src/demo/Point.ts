import { Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from "three";

class Point {
    private position: Vector3;
    private instance: Mesh;
    constructor(pos: Vector3, scene: any) {
        this.position = pos;
        const geometry = new SphereGeometry();
        const material = new MeshBasicMaterial({ color: 0xffff00 });
        this.instance = new Mesh(geometry, material);
        scene.add(this.instance);
    }
}

export default Point;

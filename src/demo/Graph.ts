import { Mesh, Vector3 } from "three";
import Point from "./Point";

class Graph {
    private width: number;
    private height: number;
    private mesh: [Point];
    private scene: any;
    constructor(width: number, height: number, scene: any) {
        this.width = width;
        this.height = height;
        this.scene = scene;
        this.initMesh();
    }
    initMesh() {
        for (let i = -this.width / 2; i <= this.width / 2; i += 2) {
            for (let j = -this.width / 2; j <= this.width / 2; j += 2) {
                this.mesh.push(new Point(new Vector3(i, j, 0), this.scene));
            }
        }
    }
}

export default Graph;

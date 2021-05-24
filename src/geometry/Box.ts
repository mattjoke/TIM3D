import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

class Box {
    private geometry: BoxGeometry;
    private material: MeshStandardMaterial;
    public instance: Mesh;
    constructor() {
        this.geometry = new BoxGeometry(1, 1, 1);
        this.geometry;
        this.material = new MeshStandardMaterial();
        this.material.flatShading = false;
        this.instance = new Mesh(this.geometry, this.material);
    }
}

export default Box;

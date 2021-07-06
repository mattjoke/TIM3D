import {
    BoxGeometry,
    ConeGeometry,
    Mesh,
    MeshStandardMaterial,
    TorusKnotGeometry,
} from "three";

class Box {
    private geometry: TorusKnotGeometry;
    private material: MeshStandardMaterial;
    public instance: Mesh;
    constructor() {
        this.geometry = new TorusKnotGeometry(10, 3, 100, 16);
        this.material = new MeshStandardMaterial({
            color: "red",
        });
        this.instance = new Mesh(this.geometry, this.material);
    }
    animate() {
        this.geometry.rotateX(0.01);
    }
}

export default Box;
